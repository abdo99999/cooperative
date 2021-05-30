import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { SubCategoriesComponent } from './sub-categories.component';
import { formatLabel } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SubCategoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SubCategoriesRoutingModule
  ]
})
export class SubCategoriesModule { }
