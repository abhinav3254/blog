import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ClothResponse, Content } from 'src/app/interfaces/cloth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clothsResponse: ClothResponse | undefined;
  cloths: Content[] = [];

  constructor(
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCloths();
  }

  getAllCloths(): void {
    this.homeService.getAllCloths().subscribe(
      (res => {
        this.clothsResponse = res as ClothResponse;
        this.cloths = this.clothsResponse.content;
      })
    );
  }

  trimNameLength(name: string): string {
    if (name.length > 30) {
      return name.substring(0, 30) + '...';
    }
    return name;
  }

  navigateToProduct(clothId: number) {
    this.router.navigate(['/product', clothId])
  }

}
