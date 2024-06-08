import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { StoreLocatorComponent } from './components/store-locator/store-locator.component';
import { BannerComponent } from './components/banner/banner.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { SimilarProductsComponent } from './components/similar-products/similar-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    StoreLocatorComponent,
    BannerComponent,
    SingleProductComponent,
    SearchResultComponent,
    SimilarProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
