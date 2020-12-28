import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { CustomValidators } from 'src/app/common/custom-validators';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart-service.service';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';
import { CheckoutServices } from 'src/app/services/checkout-services.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  formCheckoutGroup : FormGroup;
  totalPrice : number = 0;
  totalQuantity : number = 0;
  creditCardYears : number[] = [];
  creditCardMonths : number[] = [];
  countries : Country[] = [];
  states : State[] = [];

  constructor(private formBuilder : FormBuilder,private checkoutFormService : CheckoutFormService, private countryService : CountryService,
              private cartService : CartService, private checkoutService : CheckoutServices, private router: Router) { }

  ngOnInit(): void {

    this.checkoutFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(
      data => this.creditCardMonths = data
    );

    this.checkoutFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );

    this.getCountryList();

    this.updateTotal();

    this.formCheckoutGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : new FormControl("", [Validators.required, Validators.minLength(2)]),
        lastName : new FormControl("", [Validators.required, Validators.minLength(2)]),
        email : new FormControl("", [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")])
      }),
      shippingAddress : this.formBuilder.group({
        country : [""],
        street : new FormControl("", [Validators.required, Validators.minLength(2)]),
        city : new FormControl("", [Validators.required, Validators.minLength(2)]),
        state : [""],
        zip : new FormControl("", [Validators.required, Validators.minLength(5)])
      }),
      cardDetails : this.formBuilder.group({
        type : [""],
        number : new FormControl("", [Validators.required, Validators.minLength(15)]),
        name : new FormControl("", [Validators.required, Validators.minLength(2)]),
        cvv : new FormControl("", [Validators.required, Validators.minLength(3)]),
        expiryMonth : [""],
        expiryYear : [""]
      }),
    });
  }

  updateMonthByYear(){

    let selectedYear : number = (this.formCheckoutGroup.value.cardDetails.expiryYear);
    let checkDate = new Date();
    let startMonth = checkDate.getMonth() + 1;

    if(selectedYear != checkDate.getFullYear()) {
      startMonth = 1;
    }

    this.checkoutFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }

  getCountryList() {
    this.countryService.getCountryList().subscribe(
      data => this.countries = data
    )
  }

  updateStateByCountry() {
    this.countryService.getStateList(this.formCheckoutGroup.value.shippingAddress.country.id).subscribe(
      data => this.states = data
    );
  }

  onSubmit() {
    if(this.formCheckoutGroup.invalid) {
      this.formCheckoutGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    let orderItems : OrderItem[] = [];
    const cartItems = this.cartService.cartItemList;
    for(let temp of cartItems) {
      orderItems.push(new OrderItem(temp));
    }
    let purchase : Purchase = new Purchase();
    purchase.shippingAddress = this.formCheckoutGroup.get("shippingAddress")?.value;
    let country : Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.country = country.name;
    purchase.customer = this.formCheckoutGroup.get("customer")?.value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.saveOrderToDataBase(purchase).subscribe({
      "next" : response => {
        alert(`Your order has been saved.\nOrder Tracking number is ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      "error" : err => {
        alert(`There has been an error : ${err.message}`)
      } 
    })

  }

  get firstName() {
    return this.formCheckoutGroup.get("customer.firstName");
  }

  get lastName() {
    return this.formCheckoutGroup.get("customer.lastName");
  }

  get email() {
    return this.formCheckoutGroup.get("customer.email");
  }

  get street() {
    return this.formCheckoutGroup.get("shippingAddress.street");
  }

  get city() {
    return this.formCheckoutGroup.get("shippingAddress.city");
  }

  get zip() {
    return this.formCheckoutGroup.get("shippingAddress.zip");
  }

  get cardNumber() {
    return this.formCheckoutGroup.get("cardDetails.number");
  }

  get nameOnCard() {
    return this.formCheckoutGroup.get("cardDetails.name");
  }

  get cvv() {
    return this.formCheckoutGroup.get("cardDetails.cvv");
  }

  updateTotal() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  resetCart() {
    this.cartService.cartItemList = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.formCheckoutGroup.reset;
    this.router.navigateByUrl("/product")
  }
}
