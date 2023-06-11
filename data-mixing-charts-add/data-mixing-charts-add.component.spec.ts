import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMixingChartsAddComponent } from './data-mixing-charts-add.component';

describe('DataMixingChartsAddComponent', () => {
  let component: DataMixingChartsAddComponent;
  let fixture: ComponentFixture<DataMixingChartsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataMixingChartsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMixingChartsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
