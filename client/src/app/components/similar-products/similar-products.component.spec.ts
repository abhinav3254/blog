import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProductsComponent } from './similar-products.component';

describe('SimilarProductsComponent', () => {
  let component: SimilarProductsComponent;
  let fixture: ComponentFixture<SimilarProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarProductsComponent]
    });
    fixture = TestBed.createComponent(SimilarProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
