import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'search', component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
