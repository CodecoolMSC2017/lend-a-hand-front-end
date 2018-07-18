import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFilterComponent } from './ad-filter.component';

describe('AdFilterComponent', () => {
  let component: AdFilterComponent;
  let fixture: ComponentFixture<AdFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
