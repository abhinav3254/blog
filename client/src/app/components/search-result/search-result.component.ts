import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  query: string = '';


  ngOnInit(): void {
    this.router.queryParams.subscribe(
      (params) => {
        console.log(params['query']);
        this.query = params['query'];
      }
    );
  }

}
