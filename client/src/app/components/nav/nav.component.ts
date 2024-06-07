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

  navItems: string[] = ['MEN', 'WOMEN', 'DECORATION', 'JEWELRY'];

  searchQuery(): void {
    this.router.navigate(['/query'], { queryParams: { query: this.query } });
  }

}
