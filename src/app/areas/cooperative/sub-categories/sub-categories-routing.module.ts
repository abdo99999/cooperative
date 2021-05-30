import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoriesComponent  } from './sub-categories.component'
const routes: Routes = [{

    path: '',
    component: SubCategoriesComponent,
    data: {
      title: "Sub Categories",
      breadcrumb: "Sub Categories"
    } ,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoriesRoutingModule { }
