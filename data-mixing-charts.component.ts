import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataMixing } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing';
import { DataMixingMaster } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master';
import { ServiceService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { environment } from 'src/environments/environment';
import { KeyValue } from 'src/app/dataDictionaryDescription/data-mixing-charts//models/KeyValue';
import { DataMixingDelete } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-delete';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/services.service';


@Component({
  selector: 'app-data-mixing-charts',
  templateUrl: './data-mixing-charts.component.html',
  styleUrls: ['./data-mixing-charts.component.css'],
  providers: [ServiceService]
})
export class DataMixingChartsComponent implements OnInit {
  filterText1: any;
  filterText2: any; 
  dataMixing: Array<DataMixing> = [];
  dataMixingMaster: Array<DataMixingMaster> = [];
  dataMixingFirstVersion: Array<DataMixing> = [];
  dataMixingSecondVersion: Array<DataMixing> = [];
  vare: string; 
  selectDate: boolean = false;
  minDate: boolean = false;
  maxDate: boolean = false;
  dataDictionaryGridData: DataSource;
  dataMixingVersionTest: number;
  tableDetails: DataSource;
  baseUrl: string = environment.baseUrl;
  mainUrl: string = this.baseUrl + 'DataMixing';
  positionOf: string;
  warningText = "UYARI";
  selectedItem: DataMixingMaster = new DataMixingMaster();
  parameters: KeyValue[];
  selectedParameter: number;
  popupVisible = false;
  dataMixingDelete = new DataMixingDelete();
  id: any;
  deleteId: any;
  dataMixingMasterDelete = new DataMixingMaster();
  constructor(private services: ServicesService, private httpClient: HttpClient, private router: Router, private toastrService: ToastrService) { }

    

  loadingVisible = false;
  testVisible = false;

  ngOnInit(): void {

   
    this.getDataMixingMaster();
  }

  getDataMixingMaster() {
    this.services.getMasterAll().subscribe((response: Array<DataMixingMaster>) => {
      this.dataMixingMaster = response;
    })
  }

  downloadFile(data: Blob) {
    const contentType = 'application/vnd.openxmlformats-ficedocument.spreadsheetml.sheet';
    const blob = new Blob([data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  radioChangeHandler(event: any) {
    this.loadingVisible=true;
  }




  dateChangeHandler(event: any) {
    
    this.selectDate = true;

  }
  minDateChangeHandler(event: any) {

    this.minDate = true;

  }
 
   maxDateChangeHandler(event: any) {

     this.maxDate = true;

  }

   
 
  
  newDataAdd() {
    this.router.navigate(['/addDataMixing']);
  }
 
  

  detailData(event) {
   
    this.router.navigate(['/Version/', event.data.dataMixingMasterId,0]);
  }

  /*
  getDatabaseList(request: DataMixingMaster) {
    this.services.getTableList(request)
      .subscribe(response => {
        this.dataMixingMasterbot = response;
      })
  }
   */

  warningPopUp(event) {
    this.deleteId = event.data.dataMixingMasterId;

    this.popupVisible = true;

  }
  async deleteData(deleteId) {


    this.dataMixingMasterDelete.dataMixingMasterId = deleteId;
    
    this.dataMixingDelete.isActive = false;
   
    this.services.deleteDataMaster(this.dataMixingMasterDelete).subscribe(data => {


      this.toastrService.success("Silme işlemi başarılı");
      this.getDataMixingMaster();
    }, err => {
      this.toastrService.error("Silme işlemi başarısız");
      this.getDataMixingMaster();
    }

    );

    this.popupVisible = false;




  }
}
