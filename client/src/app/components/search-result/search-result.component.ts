import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { ClothResponse, Content } from 'src/app/interfaces/cloth-response';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private homeService: HomeService,
    private _router: Router
  ) { }

  clothsResponse: ClothResponse | undefined;
  cloths: Content[] = [];

  query: string = '';
  page: number = 0;


  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (params) => {
        console.log(params['query']);
        this.query = params['query'];
        this.getByQuery(this.query, this.page);
      }
    );
  }

  getByQuery(query: string, page: number): void {
    this.homeService.getByQuery(query, page).subscribe(
      (res => {
        this.clothsResponse = res as ClothResponse;
        this.cloths = this.clothsResponse.content;
        console.log(this.cloths);

      })
    );
  }

  reduceClothLength(name: string): string {
    if (name.length > 30) return name.substring(0, 30) + '...';
    return name;
  }

  navigateToProduct(clothId: number) {
    this._router.navigate(['/product', clothId])
  }

  decrementPage(): void {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.getByQuery(this.query, this.page);
    }

  }

  incrementPage(): void {
    if (this.clothsResponse) {
      if (this.page < this.clothsResponse.totalPages) {
        this.page = this.page + 1;
        this.getByQuery(this.query, this.page);
      }
    }
  }

}
