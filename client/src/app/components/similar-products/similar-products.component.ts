import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ClothResponse, Content } from 'src/app/interfaces/cloth-response';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css']
})
export class SimilarProductsComponent implements OnInit {

  @Input() occasion: string = '';
  clothsResponse: ClothResponse | undefined;
  cloths: Content[] = [];
  clothId: number = 0;

  constructor(
    private homeService: HomeService,
    private _router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getByOccasion();
    this.activeRoute.params.subscribe(params => {
      this.clothId = params['id'];
      if (this.clothId != 0) {
        this.getByOccasion();
      }
    });
  }

  getByOccasion() {
    // generating random numbers in between of 0 to 5
    const page = this.getRandomInt(4);
    const size = this.getRandomInt(18)
    this.homeService.getByQueryAndSize(this.occasion, page, size).subscribe(
      (res) => {
        this.clothsResponse = res as ClothResponse;
        this.cloths = this.clothsResponse.content;
      }
    );
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  navigateToProduct(clothId: number) {
    this._router.navigate(['/product', clothId])
  }


}
