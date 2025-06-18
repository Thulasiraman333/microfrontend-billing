import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomerReceiverService } from '../Services/customer-receiver.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {

  billingForm: FormGroup;
  customer: any;

  receiverService = inject(CustomerReceiverService);
  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      items: this.fb.array([this.createItem()])
    });
  }
  ngOnInit(): void {
    this.receiverService.customer$.subscribe(data => {
      if (data) {
        console.log('[Billing] Got customer:', data);
        this.customer = data;
      }
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get items(): FormArray {
    return this.billingForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  getTotal(): number {
    return this.items.controls.reduce((total, group) => {
      const qty = group.get('quantity')?.value || 0;
      const price = group.get('price')?.value || 0;
      return total + qty * price;
    }, 0);
  }

  submitForm(): void {
    if (this.billingForm.valid) {
      console.log('Billing Data:', this.billingForm.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  }

}
