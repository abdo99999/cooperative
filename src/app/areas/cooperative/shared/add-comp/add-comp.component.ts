import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from '../../Models/categories';
import { Subcategories } from '../../Models/subCategories';
import { CategoriesService } from '../../services/categories.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
  selector: 'app-add-comp',
  templateUrl: './add-comp.component.html',
  styleUrls: ['./add-comp.component.scss']
})
export class AddCompComponent implements OnInit {


  categories : Categories[];
  result=false;
  editmode=false;
  form:FormGroup;
  formm:FormGroup;
  categ:boolean=false;
  public closeResult: string;
  
  subcategories : Subcategories[];

  initializeForm(){
    this.form=this.fb.group({
      id:[],
      categoryName:['',Validators.required]
    });
    this.formm=this.fb.group({
      id:[],
      subCategoryName:['',Validators.required],
      mainCategory:['',Validators.required]
    });
  }

  
  constructor(private CategoriesService : CategoriesService,private serv:SubcategoriesService,private modalService: NgbModal,private fb:FormBuilder) { }
  


///OPEN THE MODAL OF ADD
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.result=false;
    this.categ=true;
    this.editmode=false;
  }
///OPEN THE MODAL OF UPDATE

  open2(content,item) {
    if(this.categ===true){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });    
    this.categorie.id= item.id;
    this.categorie.categoryName= item.categoryName;
    this.result=true;
    this.editmode=true;
  }
  else{
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.subcategorie.id = item.id;
    this.subcategorie.subCategoryName = item.subCategoryName;
    this.subcategorie.mainCategory = item.mainCategory;
    this.result=true;
    this.editmode=true;
  }
  }

  categorie:any={
     id:'',
     categoryName:''
  }

  subcategorie:any={
    id:'', 
    subCategoryName:'',
    mainCategory:''
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

///LOAD CAT && INITIALIZE THE FORM
  ngOnInit(): void {
    this.GetCategories();
    this.initializeForm();
    
    this.categorie = this.CategoriesService
    .getCategories();

  }


  ///GET CATEGORIES
  GetCategories(){
    this.CategoriesService.getCategories().subscribe((categories : Categories[]) => {
      this.categories = categories;
    },
    error => {
      console.log(this.categories);
    });
  }

  GetSubcategories(){
    this.serv.getSubcategories().subscribe((subcategories : Subcategories[]) => {
      this.subcategories = subcategories;
    },
    error => {
      console.log('something was wrong ');
    }); 
  }
  

  openn(content2) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.result=false;
    this.categ=false;
    this.editmode=false; 
  }

   
///ADD 
Add(){
    if(this.categ){
      this.CategoriesService.addCateg(this.form.value).subscribe((res)=>{
        this.form.reset();
        this.GetCategories();
        setTimeout(()=>{
          window.location.reload();
        }, 100);
     })}
     else{
      this.serv.addSubcateg(this.formm.value).subscribe((res)=>{
        this.formm.reset();
        this.GetSubcategories();
        setTimeout(()=>{
          window.location.reload();
        }, 100);
     });
    }
  

}

Edit(){
  if(this.categ){
    this.CategoriesService.updateCateg(this.form.value)
    .subscribe(categ=>{
     this.form.reset();
     this.GetCategories();
     setTimeout(()=>{
      window.location.reload();
    }, 100);
   })}
   else{
    this.serv.updateSubcateg(this.formm.value)
    .subscribe(subcateg=>{
     this.formm.reset();
     this.GetSubcategories();
     setTimeout(()=>{
      window.location.reload();
    }, 100);
   });
  }


}


Delete(id){
 
    this.CategoriesService.deleteCateg(id)
    .subscribe(()=>{
      this.categories=this.categories.filter
      (item=>item.id!=id);
    
  
})}

DeleteSub(id){
  this.serv.deleteSubcateg(id)
  .subscribe(()=>{
    this.subcategories=this.subcategories.filter
    (item=>item.id!=id);
 })
}



Hide(){
  let d1=document.getElementById("categ");
  let d2=document.getElementById("subcat");
  
    d2.style.display="none";
    d1.style.display="block";
    
  
}

Hide2(){
  let d1=document.getElementById("categ");
  let d2=document.getElementById("subcat");

    d2.style.display="block";
    d1.style.display="none";
    
  
}

}
