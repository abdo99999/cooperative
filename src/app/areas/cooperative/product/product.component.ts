import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../Models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private service :  ProductsService,private modalService: NgbModal) { }
  public closeResult: string;
  produits : Products[];
  produit:any={
    produitId:'',
    productReference:'',
    productName:'',
    productDescription:'',
    productPrice:'',
    productQuantity:'',
    productDiscount:'',
    productExpiredDate:'',
    productRate:''
  }

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

  ngOnInit(): void {
    this.GetProducts();
  }
  GetProducts(){
    this.service.getProducts().subscribe((produits : Products[]) => {
      this.produits = produits;
    },
    error => {
      console.log('something was wrong ');
    });
  }
  public counter: number = 1;

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }
  GetProduct(productId){
    this.service.getProduct(productId).subscribe((produits : Products[]) => {
      this.produits = produits;
    },
    error => {
      console.log('something was wrong ');
    });
  }

  videInput(){
    this.produit={
      produitId:'',
      productReference:'',
      productName:'',
      productDescription:'',
      productPrice:'',
      productQuantity:'',
      productDiscount:'',
      productExpiredDate:'',
      productRate:''  
    }
  }

  addProduct(){
    this.service.addProduct(this.produit).subscribe((res)=>{
     this.produits=[res,...this.produits]
     }
    
      );
      this.videInput();
   }

   deleteProduct(id){
    this.service.deleteProduct(id)
    .subscribe(()=>{
      this.produits=this.produits.filter
      (item=>item.ProductId!=id)
    });
    
  }

  updateProduct(item){
    this.produit = item;
 }

 

editProduct(){
  this.service.updateProduct(this.produit)
  .subscribe(prod=>{
    this.videInput();
  })
}

}
