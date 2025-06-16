import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { BillingRoutingModule } from './billing-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
