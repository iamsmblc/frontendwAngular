import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataDictionary } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataDictionary';
import { ServiceService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataMixing } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing';
import { environment } from 'src/environments/environment';
import { DataMixingMasterMain } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master-main';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ServicesService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/services.service';
import { ApprovalStatusNameRequest } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/approvalStatusNameRequest';
import { first } from 'rxjs/internal/operators/first';


@Component({
  selector: 'app-data-mixing-charts-add',
  templateUrl: './data-mixing-charts-add.component.html',
  styleUrls: ['./data-mixing-charts-add.component.css'],
  providers: [ServiceService]
})
export class DataMixingChartsAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private services: ServicesService, private service: ServiceService, private toastrService: ToastrService, private datePipe: DatePipe) { }
  datamixing: dataDictionary;
  dataMixing: Array<dataDictionary> = [];
  datamixingAddForm: FormGroup;
  baseUrl: string = environment.baseUrl;
  mainUrl: string = this.baseUrl + 'DataMixing';
  dataMixingMasterMain = new DataMixingMasterMain();
  dataDictionaryId_: number;
  dataMixingVersionDescription_: string;
  excelLink_: string;
  approvalMailLink_: number;
  counter: string[] = ['counter'];
  date =Date.now();
  dataMixingVersion_ = "VKC" + this.datePipe.transform(this.date, "ddMMYYYY-HHmmss");
  approvalStatusName_: string;
  fromDate_ = this.datePipe.transform(this.date, "dd/MM/YYYY");
  inputValidation: any = {};
  approvalStatusName: string;
  approvalStatusId: number;
  approvalStatusNameRequest: Array<ApprovalStatusNameRequest> = [];
  documentId: any;
  documentExcelId: any;


  ngOnInit() {
    this.services.getApproval().subscribe((response: Array<ApprovalStatusNameRequest>) => {
      this.approvalStatusNameRequest = response;
      this.approvalStatusName = this.approvalStatusNameRequest.map(x => x.approvalStatusName).toString();
      this.approvalStatusId = +this.approvalStatusNameRequest.map(x => x.approvalStatusId).toString();
     
    })
   
  }
  addData(dataMixingVersionDescription,  excelLink, approvalMailLink) {
   
    if (dataMixingVersionDescription == null || dataMixingVersionDescription == "" || dataMixingVersionDescription == " ") {
      this.toastrService.warning('Veri Karıştırma Verisyonu Açıklaması girilmelidir.');

    }
    else {
      this.dataMixingMasterMain.isApproved = this.approvalStatusId;
      this.dataMixingMasterMain.dataMixingVersion = this.dataMixingVersion_;
      this.dataMixingMasterMain.dataMixingVersionDescription = dataMixingVersionDescription;
      this.dataMixingMasterMain.excelLink = this.documentExcelId;
      this.dataMixingMasterMain.approvalMailLink = this.documentId;



      this.services.addDataMixingMaster(this.dataMixingMasterMain).subscribe(data => {

        this.toastrService.success('Ekleme işlemi başarılı.');
        this.router.navigate(['/dataMixing']);




      });
    }
  }

  fileMailToUpload: File = null;
  onMailChange(event) {
    this.fileMailToUpload = event.target.files[0];
    

  }
  fileExcelToUpload: File = null;
  onExcelChange(event) {
    this.fileExcelToUpload = event.target.files[0];


  }

  dataMixingMailAddFile(fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('files_', fileToUpload);
    return this.services.addMailDataMixing( formData);
    //return this.httpClient.post(this.mainUrl + '/AddDataMixingMailMasterMain/', formData);
  }

  onMailUpload() {
    if (this.fileMailToUpload == null) {
      this.toastrService.warning('Onaylanmış Mail Bağlantısı dosyası seçilmedi');
    }
     
    this.dataMixingMailAddFile(this.fileMailToUpload).subscribe(data => {
      this.documentId = data;
      this.toastrService.success('Onaylanmış Mail Bağlantısı yükleme işlemi başarılı');
    
    });

  }

  dataMixingExcelAddFile(fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('files_', fileToUpload);
    return this.services.addExcelDataMixing(formData);
    //return this.httpClient.post(this.mainUrl + '/AddDataMixingExcelMasterMain/', formData);
  }

  onExcelUpload() {
    if (this.fileExcelToUpload == null) {
      this.toastrService.warning('Excel Bağlantısı dosyası seçilmedi');
    }
    this.dataMixingExcelAddFile(this.fileExcelToUpload).subscribe(data => {
      this.documentExcelId = data;
      this.toastrService.success('Excel Bağlantısı yükleme işlemi başarılı');

    });

  }

  redirectToHome() {
    this.router.navigate(['/dataMixing']);
  }




}
