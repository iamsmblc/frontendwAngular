import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixingVersionDetailComponent } from './mixing-version-detail.component';

describe('MixingVersionDetailComponent', () => {
  let component: MixingVersionDetailComponent;
  let fixture: ComponentFixture<MixingVersionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MixingVersionDetailComponent ]
    })  
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixingVersionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
