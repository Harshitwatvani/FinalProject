import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPassengersComponent } from './show-passengers.component';

describe('ShowPassengersComponent', () => {
  let component: ShowPassengersComponent;
  let fixture: ComponentFixture<ShowPassengersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPassengersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
