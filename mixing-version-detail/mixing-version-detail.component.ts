import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataDictionary } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataDictionary';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataMixing } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing';
import { ServiceService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/service.service';
import { DataMixingMaster } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr'; 
import { DataMixingMasterUpdate } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master-update';
import { DataMixingUpdate } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-update';
import { DataMixingDelete } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-delete';
import { KeyValue } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/KeyValue';
import { KeyValueResponseModel } from 'src/app/reportFormat/Accessibility Type/Models/KeyValueResponseModel';
import { AddParameterModel } from 'src/app/Pages/product-review/model/addParameterModel';
import { DxDataGridComponent, DxSelectBoxComponent } from 'devextreme-angular';
import { NgModule,  enableProdMode, ViewChild } from '@angular/core';
import { GetByDataMixingMasterIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/getByDataMixingMasterIdRequestModel';
import { ServicesService } from 'src/app/dataDictionaryDescription/data-mixing-charts/service/services.service';
import { DataMixingMasterMain } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master-main';
import { DataMixingMasterIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingMasterIdRequestModel';
import { DataMixingDictionaryIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingDictionaryIdRequestModel';
import { DataMixingDetailUpdateModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingDetailUpdateModel';
import { KeyValue2 } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/KeyValue2';
import { KeyValueRule } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/KeyValueRule';
import { PreviousRouteService } from 'src/app/infrastructure/previous-route.service';
import { DatePipe } from '@angular/common';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs'
import { DataMixingMailDocument } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingMailDocument';
import { DataMixingExcelDocument } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingExcelDocument';
import { DataMixingRule } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingRule';
import { DataMixingMasterIdModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/DataMixingMasterIdModel';
import { DataMixingApprovalStatus } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingApprovalStatus';
import { DataMixingIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingIdRequestModel';



@Component({
  selector: 'app-mixing-version',
  templateUrl: './mixing-version-detail.component.html',
  styleUrls: ['./mixing-version-detail.component.css']   
}) 
export class MixingVersionDetailComponent implements OnInit {
  @ViewChild('dataDictionaryGrid', { static: true }) dataDictionaryGrid: DxDataGridComponent;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,
    private route: ActivatedRoute, private services: ServicesService, private service: ServiceService, private toastrService: ToastrService, private previousRouter: PreviousRouteService, private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.getParametersRule();
    this.getParametersScope();
    this.previousRouter.getPreviousUrl();
    this.activatedRoute.params.subscribe(params => {
      this.pageNumber = +params['pageNumber'];
      
    });
  }
  datamixing: dataDictionary;
  dataMixing: Array<DataMixing> = [];
  datamixingAddForm: FormGroup
  id: any;
  data: any;
  dataMixingMaster: Array<DataMixingMaster> = [];
  dataMixingApprovalStatusList: Array<DataMixingApprovalStatus> = [];
  dataMixingMailDocument: Array<DataMixingMailDocument> = [];
  dataMixingExcelDocument: Array<DataMixingExcelDocument> = [];
  baseUrl: string = environment.baseUrl;
  baseFileUrl: string = environment.baseUrl.replace('/api/', '/').replace('/api', '/');

  mainUrl: string = this.baseUrl + 'DataMixing';
  popUpText = "Veri Karıştırma Çizelgesi Veri Detayı";
  dataMixingUpdate = new DataMixingUpdate();
  dataMixingMasterUpdate = new DataMixingMasterUpdate();
  newId: any;
  desc: string;
  rule: number;
  scope: number;
  masterId: number;
  popupVisible: boolean = false;
  popupDeleteVisible: boolean = false;
  popupApprovementPopUpVisible: boolean = false;
  popupImportVisible: boolean = false;
  positionOf: string;
  deleteId: any;
  deleteMasterId: any;
  importId: any;
  dataMixingDelete = new DataMixingDelete();
  warningText = "UYARI";
  parametersRule: KeyValue[];
  parametersScope: KeyValue2[];
  parameters: KeyValue[];
  selectedParameter: number;
  keyValueModelScope: KeyValue[];
  keyValueModelRule: KeyValue[];
  keyr: any;
  valuer: string;
  visibleScope: boolean = false;
  visibleRule: boolean = false;
  dataScopeRule: any;
  pageNumber = 0;
  n: number = 301;
  idTest: any;
  dataMixingMasterIdRequestModel = new DataMixingMasterIdRequestModel();
  getByDataMixingMasterIdRequestModel: GetByDataMixingMasterIdRequestModel = new GetByDataMixingMasterIdRequestModel();
  dataMixingIdRequestModel: DataMixingIdRequestModel = new DataMixingIdRequestModel();
  dataMixingDictionaryIdRequestModel = new DataMixingDictionaryIdRequestModel();
  dataMixingMasterRequestModel = new DataMixingMasterIdModel();
  dataMixingDetailUpdateModel = new DataMixingDetailUpdateModel();
  dataMixingVersion_: string;
  approvalId: any;
  dataMixingVersionDescription_: string;
  approvalStatusName_: string;
  fromDate_: any;
  excelLink_: number;
  approvalMailLink_: number;
  validatorChecking: boolean = true;
  validatorCheckingRule: boolean = true;
  validatorCheckingScope: boolean = true;
  addParameterValue: AddParameterModel = new AddParameterModel();
  selectedFile: File = null;
  id_file_document: number;
  cont: string;
  linkMailText: string;
  linkExcelText: string;
  linkMailVisible: boolean = false;
  linkExcelVisible: boolean = false;
  dataMixingDocumentId_: any;
  fileName_: string;
  contentType_: string;
  fileSize_: number;
  dataMixingExcelId_: any;
  fileName_e: string;
  contentType_e: string;
  fileSize_e: number;
  mailStatusVisibility: boolean = false;
  excelStatusVisibility: boolean = false;
  urlExceltoCopy: any;
  urlMailtoCopy: any;
  datamixingRuleValue: DataMixingRule = new DataMixingRule();
  checkNullMixing: any;
  checkNullMixingScope: any;
  dataMixingApprovalStatus: DataMixingApprovalStatus = new DataMixingApprovalStatus();
  importVisible: boolean = false;
  showUploaderExcel: boolean = true;
  showUploaderMail: boolean = true;
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getData();
    this.getApprovalStatusData();
    this.getDetailData();
    this.addParameterValue.name;
    this.getDocument();
    this.getExcelDocument();
    this.checkDetailData();
    this.checkDetailScopeData();

  }
  onExporting(e) {
    e.component.beginUpdate();
    e.component.columnOption("dataDescription", "visible", true);  
  }
  getParametersScope(): void  {
    this.services.getParametersScope().subscribe(response => {
      this.keyValueModelScope = response; 
    })
  }
  getParametersRule():void {
    this.services.getParametersRule().subscribe(response=> {
      this.keyValueModelRule = response;
    })
  }



  detailDataPage(event) {
  
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/detail/', event, 0, 0])
    );

    window.open(url, '_blank');

    
  }



  
 
  getDetailData() {
    this.dataMixingMasterIdRequestModel.dataMixingMasterId = this.id;
    this.services.getDetailVersionData(this.dataMixingMasterIdRequestModel).subscribe((response: Array<DataMixing>) => {
      this.dataMixing = response;
    })
  }
  checkDetailData() {
    this.dataMixingMasterRequestModel.dataMixingMasterId = this.id;
    this.services.checkDetail(this.dataMixingMasterRequestModel).subscribe(response => {
      this.checkNullMixing = response;
    })
  }
  checkDetailScopeData() {
    this.dataMixingMasterRequestModel.dataMixingMasterId = this.id;
    this.services.checkDetailScope(this.dataMixingMasterRequestModel).subscribe(response => {
      this.checkNullMixingScope = response;
    })
  }

  getData() {
    this.getByDataMixingMasterIdRequestModel.id = this.id;
    this.services.getMasterById(this.getByDataMixingMasterIdRequestModel).subscribe((response: Array<DataMixingMaster>) => {
      this.dataMixingMaster = response;
      this.dataMixingVersion_ = this.dataMixingMaster.map(x => x.dataMixingVersion).toString();
      this.dataMixingVersionDescription_ = this.dataMixingMaster.map(x => x.dataMixingVersionDescription).toString();
      this.approvalStatusName_ = this.dataMixingMaster.map(x => x.approvalStatusName).toString();
      this.fromDate_ =  this.datePipe.transform(this.dataMixingMaster.map(x => x.fromDate).toString(), "dd/MM/YYYY")
      this.excelLink_ = +this.dataMixingMaster.map(x => x.excelLink).toString();
      this.approvalMailLink_ = +this.dataMixingMaster.map(x => x.approvalMailLink).toString();
      if (this.excelLink_ === 0) {
        this.linkExcelVisible = false
        this.excelStatusVisibility = false;
      }
      else {
        this.linkExcelVisible = true
        this.excelStatusVisibility = true;
      }
      if (this.approvalMailLink_ === 0) {
        this.linkMailVisible = false
        this.mailStatusVisibility = false;
      }
      else {
        this.linkMailVisible = true
        this.mailStatusVisibility = true;
      }
      this.linkMailText = "Onaylanmış Mail Bağlantısı " + this.dataMixingVersion_;
      this.linkExcelText = "Onaylanmış Excel Bağlantısı " + this.dataMixingVersion_;
    })
   
  }
  getApprovalStatusData() {
    this.dataMixingApprovalStatus.dataMixingMasterId = this.id;
    this.services.getApprovalStatusbyId(this.dataMixingApprovalStatus).subscribe((response: Array<DataMixingApprovalStatus>) => {
      this.dataMixingApprovalStatusList = response;
      this.approvalId = +this.dataMixingApprovalStatusList.map(x => x.isApproved).toString();
      if (this.approvalId ==1) {
        this.importVisible = true
      }
      else {
        this.importVisible=false
      }
   
   
    })

  }


  getDocument() {
    this.dataMixingIdRequestModel.dataMixingMasterId = this.id;
    return this.services.getMailById(this.dataMixingIdRequestModel).subscribe((response: Array<DataMixingMailDocument>) => {
      this.dataMixingMailDocument = response;
      this.dataMixingDocumentId_ = this.dataMixingMailDocument.map(x => x.dataMixingMailDocumentId).toString();
      this.fileName_ = this.dataMixingMailDocument.map(x => x.fileName).toString();
      this.contentType_ = this.dataMixingMailDocument.map(x => x.contentType).toString();
     this.fileSize_ = +this.dataMixingMailDocument.map(x => x.fileSize).toString();
   

    })
  }
  getExcelDocument() {
    this.dataMixingIdRequestModel.dataMixingMasterId = this.id;
    return this.services.getExcelById(this.dataMixingIdRequestModel).subscribe((response: Array<DataMixingExcelDocument>) => {
      this.dataMixingExcelDocument = response;
      this.dataMixingExcelId_ = this.dataMixingExcelDocument.map(x => x.dataMixingExcelDocumentId).toString();
      this.fileName_e = this.dataMixingExcelDocument.map(x => x.fileName).toString();
      this.contentType_e= this.dataMixingExcelDocument.map(x => x.contentType).toString();
      this.fileSize_e = +this.dataMixingExcelDocument.map(x => x.fileSize).toString();


    })
  }
  updateMasterData(dataMixingVersionDescription, excelLink, approvalMailLink) {
    
    
    this.dataMixingMasterUpdate.dataMixingMasterId = this.id;
    this.dataMixingMasterUpdate.dataMixingVersionDescription = dataMixingVersionDescription;
    this.dataMixingMasterUpdate.excelLink = excelLink;
    this.dataMixingMasterUpdate.approvalMailLink = approvalMailLink;

    this.services.dataMixingUpdateMaster( this.dataMixingMasterUpdate).subscribe(data => {
      window.location.reload();
      this.toastrService.success('Güncelleme işlemi başarılı.');

    });
  }
  
  updateStatus() {
    
    this.dataMixingMasterUpdate.dataMixingMasterId = this.id;
    this.dataMixingMasterUpdate.isApproved = 1;
    

    this.services.dataMixingUpdateMasterStatus(this.dataMixingMasterUpdate).subscribe(data => {
      window.location.reload();
     

    });
    this.toastrService.success('Onaylama işlemi başarılı.');
   
  }
  testttt:any
  detailData(event) {
    this.validatorChecking = false;
    this.validatorCheckingRule = false;
    this.validatorCheckingScope = false;
    this.popupVisible = true;
    this.newId = event.data.dataDictionaryId;
    this.desc = event.data.dataMixingDescription;
    this.testttt = event.data.dataMixingScopeId;
    if (event.data.dataMixingRuleId == null || event.data.dataMixingRuleId == "" || event.data.dataMixingRuleId == " ") {
      this.rule =null;
    }
    else if (event.data.dataMixingRuleId != null && event.data.dataMixingRuleId != "" && event.data.dataMixingRuleId != " ") {
      this.rule = event.data.dataMixingRuleId;
    }
    if (event.data.dataMixingScopeId == null || event.data.dataMixingScopeId == "" || event.data.dataMixingScopeId == " ") {

      this.scope = null;
    }
   else if (event.data.dataMixingScopeId != null && event.data.dataMixingScopeId != "" && event.data.dataMixingScopeId != " ") {

      this.scope = event.data.dataMixingScopeId;
    }
    this.masterId = event.data.dataMixingMasterId;
   
  }
  updateDetailData(newId,dataMixingMasterId, dataMixingRule, dataMixingDescription,dataMixingScope) {
  
    this.dataMixingDetailUpdateModel.dataDictionaryId = this.newId;
    this.dataMixingDetailUpdateModel.dataMixingMasterId = dataMixingMasterId;
    this.dataMixingDetailUpdateModel.dataMixingRuleId = dataMixingRule;
    this.dataMixingDetailUpdateModel.dataMixingDescription = dataMixingDescription;
    this.dataMixingDetailUpdateModel.dataMixingScopeId = dataMixingScope;
    if (dataMixingRule == null || dataMixingRule == "" || dataMixingRule == " ") {
     
      this.toastrService.warning('Veri Karıştırma Kuralı seçlimelidir.');
      this.validatorCheckingRule = true;

    }
    if (dataMixingDescription == null || dataMixingDescription == "" || dataMixingDescription == " ") {
      this.toastrService.warning('Veri Karıştırma Açıklaması alanı doldurulmalıdır.');
      this.validatorChecking = true;

    }
    if (dataMixingScope == null || dataMixingScope == "" || dataMixingScope == " ") {
      dataMixingScope = null;

      this.toastrService.warning('Veri Karıştırma Kapsamı seçlimelidir.');
      this.validatorCheckingScope = true;

    }
    if (dataMixingScope != null && dataMixingRule != null) {
      if (dataMixingDescription != null && dataMixingDescription != "" && dataMixingDescription != " ") {
        this.services.dataMixingUpdateDetail(this.dataMixingDetailUpdateModel).subscribe(data => {


          this.toastrService.success("Güncelleme işlemi başarılı");
          this.getDetailData();
          this.checkDetailScopeData();
          this.checkDetailData();
        }, err => {
          this.toastrService.error("Güncelleme işlemi başarısız");
          this.getDetailData();
          this.checkDetailScopeData();
          this.checkDetailData();
        }

        );
        this.popupVisible = false;
        this.validatorChecking = false;
        this.validatorCheckingRule = false;
        this.validatorCheckingScope = false;
      }


    }

  }
  warningDeletePopUp(event) {
    this.deleteId = event.data.dataDictionaryId
    this.deleteMasterId = event.data.dataMixingMasterId
    this.popupDeleteVisible = true;

  }
  warningApprovementPopUp() {
    if (this.excelStatusVisibility ==false) {
      this.toastrService.warning("Onaylamak için önce Excel Bağlantısı dosyası seçin");

    }
    if (this.mailStatusVisibility == false) {

      this.toastrService.warning("Onaylamak için önce Onaylanmış Mail Bağlantısı dosyası seçin");
    }
    
    if (this.checkNullMixingScope == 10) {
      this.toastrService.warning("Onaylamak için önce Kapsamları doldurun");
    }

  
    if (this.checkNullMixing == 10) {
      this.toastrService.warning("Onaylamak için önce Kuralları doldurun");
    }

    if (this.checkNullMixing == 0 && this.checkNullMixingScope == 0) {
      this.toastrService.warning("Onaylamak için önce Veri Karıştırma Çizelgesi Detay tablosu gerekli");
    }
    if (this.checkNullMixingScope==1 && this.checkNullMixing == 1 &&this.excelStatusVisibility == true && this.mailStatusVisibility == true){
      this.popupApprovementPopUpVisible = true;
    }

  }
  async deleteData(deleteId, deleteMasterId) {

    this.dataMixingDictionaryIdRequestModel.dataDictionaryId = deleteId;

    this.dataMixingDictionaryIdRequestModel.dataMixingMasterId = deleteMasterId;
    

    this.services.deleteData(this.dataMixingDictionaryIdRequestModel).subscribe(data => {


      this.toastrService.success("Silme işlemi başarılı");
      this.getDetailData();
      this.checkDetailScopeData();
      this.checkDetailData();
    }, err => {
      this.toastrService.error("Silme işlemi başarısız");
      this.getDetailData();
      this.checkDetailScopeData();
      this.checkDetailData();
    }

    );
    this.popupDeleteVisible = false;
    



  }
  warningImportPopUp() {
    
    this.popupImportVisible = true;

  }
  async addwithDataD(id) {
    this.dataMixingMasterIdRequestModel.dataMixingMasterId = id;
    this.toastrService.info('Aktarma işlemi gerçekleştiliyor, lütfen bekleyiniz.');
    this.services.addWithDataDictionary(this.dataMixingMasterIdRequestModel).subscribe(data => {
      
      window.location.reload();
      this.toastrService.success('Aktarma işlemi başarılı.');

    });


  }
  fileMailToUpload: File = null;
  isImportExcel_:File=null
  onMailChange(event) {
    this.fileMailToUpload = event.target.files[0];
  
  }
  fileExcelToUpload: File = null;
  onExcelChange(event) {
    this.fileExcelToUpload = event.target.files[0];

  }
  dataMixingAddFile(fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('files_', fileToUpload);
    formData.append('version', (this.id).toString());

    return this.services.importMailDataMixing(formData);
  }
  Logo: string;
  handleUpload(e): void {
    this.Logo = e.target.value;

  }

  onMailUpload() {
    if (this.fileMailToUpload == null) {
      this.toastrService.warning('Onaylanmış Mail Bağlantısı dosyası seçilmedi');
    }
    else {

      this.dataMixingAddFile(this.fileMailToUpload).subscribe(data => {
        this.toastrService.success('Onaylanmış Mail Bağlantısı yükleme işlemi başarılı');
        this.showUploaderMail = false;
        setTimeout(() => { this.showUploaderMail = true }, 100);
        this.getDocument();
        this.getData();
        this.getApprovalStatusData();
      });
    }
  }

  dataMixingExcelAddFile(fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('files_', fileToUpload);
    formData.append('version', (this.id).toString());

    return this.services.importExcelDataMixing(formData);
  }

  onExcelUpload() {
    if (this.fileExcelToUpload == null) {
      this.toastrService.warning('Excel Bağlantısı dosyası seçilmedi');
    }
    this.dataMixingExcelAddFile(this.fileExcelToUpload).subscribe(data => {
      this.toastrService.success('Excel Bağlantısı yükleme işlemi başarılı');
      this.showUploaderExcel = false;
      setTimeout(() => { this.showUploaderExcel = true }, 100);
      this.getExcelDocument();
      this.getData();
      this.getApprovalStatusData();
    });
   

  }
 
  downloadExcelFile() {
 

    window.open(this.baseFileUrl + 'Document/DataMixing/excel-link-file/' + this.dataMixingVersion_ + '/' + this.fileName_e);



  }
  downloadFile() {
   
   
    window.open(this.baseFileUrl + 'Document/DataMixing/approved-mail-link-file/' + this.dataMixingVersion_ + '/' + this.fileName_);
    

   
  } 


  copyExelUrl() {

    this.urlExceltoCopy = this.baseFileUrl + 'Document/DataMixing/excel-link-file/' + this.dataMixingVersion_ + '/' + this.fileName_e.split(" ").join("%20");
    event.preventDefault() 
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.urlExceltoCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.success('Bağlantı kopyalandı');
  }
  copyMailUrl() {

    this.urlExceltoCopy = this.baseFileUrl + 'Document/DataMixing/approved-mail-link-file/' + this.dataMixingVersion_ + '/' + this.fileName_.split(" ").join("%20");
    event.preventDefault()
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.urlExceltoCopy;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastrService.success('Bağlantı kopyalandı');
  }
   
  redirectToHome() {
    this.router.navigate(['/dataMixing']);
  }

}
