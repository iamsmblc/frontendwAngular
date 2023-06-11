import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMixingChartsComponent } from './data-mixing-charts.component';

describe('DataMixingChartsComponent', () => {
  let component: DataMixingChartsComponent;
  let fixture: ComponentFixture<DataMixingChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMixingChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMixingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
