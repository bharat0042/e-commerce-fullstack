import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartListComponent } from './component/cart-list/cart-list.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';
import oktaAppConfig from 'src/app/config/okta-app-config';

const oktaConfig = Object.assign({
  onAuthRequired : (injector : any) => {
    const router = injector.get(Router)
    router.navigate(['/login'])
  }
}, oktaAppConfig.odic);

const routes : Routes = [
  {path : 'login/callback', component : OktaCallbackComponent},
  {path : 'login', component : LoginComponent},
  {path : 'search/:key', component : ProductListComponent},
  {path : 'checkout', component : CheckoutComponent},
  {path : 'view-cart', component : CartListComponent},
  {path : 'product/:id', component : ProductDetailsComponent},
  {path : 'category/:id', component : ProductListComponent},
  {path : 'category', component : ProductListComponent},
  {path : 'products', component : ProductListComponent},
  {path : '', redirectTo : '/products', pathMatch : 'full'},
  {path : '**', redirectTo : '/products', pathMatch : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartListComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue : oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
