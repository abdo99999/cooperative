import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from '../Models/categories';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : Categories[];
  categorie:any={
    categoryId:'',
    categoryName:''
    
  }
  constructor(private CategoriesService : CategoriesService,private modalService: NgbModal) { }
  public closeResult: string;
  open2(content2,item) {

    this.modalService.open(content2, { ariaLabelledBy: 'modal2-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.categorie.categoryId = item.categoryId;
    this.categorie.categoryName = item.categoryName;
    
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories(){
    this.CategoriesService.getCategories().subscribe((categories : Categories[]) => {
      this.categories = categories;
    },
    error => {
      console.log('something was wrong ');
    });
  }

  GetCategorie(categoryId){
    this.CategoriesService.getCategorie(categoryId).subscribe((categories : Categories[]) => {
      this.categories = categories;
    },
    error => {
      console.log('something was wrong ');
    });
  }

  videInput(){
    this.categorie={
      CategoryId:'',
      CategoryName:'',
    }
  }

  addCategorie(){
    this.CategoriesService.addCateg(this.categorie).subscribe((res)=>{
     this.categories=[res,...this.categories]
     }
    
      );
      this.videInput();
   }

   deleteCategorie(id){
    this.CategoriesService.deleteCateg(id)
    .subscribe(()=>{
      this.categories=this.categories.filter
      (item=>item.categoryId!=id)
    });
    
  }

 

 

editCategorie(){
  this.CategoriesService.updateCateg(this.categorie)
  .subscribe(categ=>{
    this.videInput();
  })
}
}
