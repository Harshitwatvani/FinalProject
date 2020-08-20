import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundtripSeatBookComponent } from './roundtrip-seat-book.component';

describe('RoundtripSeatBookComponent', () => {
  let component: RoundtripSeatBookComponent;
  let fixture: ComponentFixture<RoundtripSeatBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundtripSeatBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundtripSeatBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
