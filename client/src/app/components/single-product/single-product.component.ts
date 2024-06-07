import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { Cloth } from 'src/app/interfaces/Cloth';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private homeService: HomeService
  ) { }

  productId: number = 0;
  cloth: Cloth | undefined;



  ngOnInit(): void {
    this.router.params.subscribe(params => {
      // because In routing I mentioned it as id
      this.productId = params['id'];
    });
    this.findProductById(this.productId);
  }

  findProductById(productId: number) {
    this.homeService.getProductById(productId).subscribe(
      (res) => {
        this.cloth = res as Cloth;
      }
    );
  }

}
