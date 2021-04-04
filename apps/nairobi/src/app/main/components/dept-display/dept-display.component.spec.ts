import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptDisplayComponent } from './dept-display.component';

describe('DeptDisplayComponent', () => {
  let component: DeptDisplayComponent;
  let fixture: ComponentFixture<DeptDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
