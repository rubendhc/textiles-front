import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBillComponent } from './product-bill.component';

describe('ProductBillComponent', () => {
  let component: ProductBillComponent;
  let fixture: ComponentFixture<ProductBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
