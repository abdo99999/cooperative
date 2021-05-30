import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent  } from './product.component';

const routes: Routes = [{
  path: '',
    component: ProductComponent,
    data: {
      title: "Products",
      breadcrumb: "Products"
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
