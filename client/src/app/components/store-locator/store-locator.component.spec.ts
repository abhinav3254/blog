import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocatorComponent } from './store-locator.component';

describe('StoreLocatorComponent', () => {
  let component: StoreLocatorComponent;
  let fixture: ComponentFixture<StoreLocatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreLocatorComponent]
    });
    fixture = TestBed.createComponent(StoreLocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
