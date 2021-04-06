import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionWrapperComponent } from './deduction-wrapper.component';

describe('DeductionWrapperComponent', () => {
  let component: DeductionWrapperComponent;
  let fixture: ComponentFixture<DeductionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
