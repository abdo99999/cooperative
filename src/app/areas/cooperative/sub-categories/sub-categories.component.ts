import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subcategories } from '../Models/subCategories';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {

  subcategories : Subcategories[];
  subcategorie:any={
    subCategoryId:'', 
    subCategoryName:'',
    mainCategoryId:'',
    isActive:''
    
  }
  constructor(private service:SubcategoriesService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetSubcategories();
  }
  public closeResult: string;
  open2(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  GetSubcategories(){
    this.service.getSubcategories().subscribe((subcategories : Subcategories[]) => {
      this.subcategories = subcategories;
    },
    error => {
      console.log('something was wrong ');
    });
  }

  GetSubcategorie(subcategoryId){
    this.service.getSubcategorie(subcategoryId).subscribe((subcategories : Subcategories[]) => {
      this.subcategories = subcategories;
    },
    error => {
      console.log('something was wrong ');
    });
  }

  videInput(){
    this.subcategorie={
      subCategoryId:'', 
      subCategoryName:'',
      
    
    }
  }

  addSubcategorie(){
    this.service.addSubcateg(this.subcategorie).subscribe((res)=>{
     this.subcategories=[res,...this.subcategories]
     }
    
      );
      this.videInput();
   }

   deleteSubcategorie(id){
    this.service.deleteSubcateg(id)
    .subscribe(()=>{
      this.subcategories=this.subcategories.filter
      (item=>item.subCategoryId!=id)
    });
    
  }

  updateSubcategorie(item){
    this.subcategorie = item;
 }

 

editSubcategorie(){
  this.service.updateSubcateg(this.subcategorie)
  .subscribe(subcateg=>{
    this.videInput();
  })
}
}
