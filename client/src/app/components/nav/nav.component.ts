import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) { }

  query: string = '';

  navItems: string[] = ['MALE', 'FEMALE', 'DECORATION', 'JEWELRY'];

  searchQuery(): void {
    this.router.navigate(['/search'], { queryParams: { query: this.query } });
    this.query = '';
  }

  goToHome(): void {
    this.router.navigate(['']);
  }

  navItemClicked(item: string) {
    this.query = item;
    this.searchQuery();
  }

}
