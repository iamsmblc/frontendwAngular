import { Injectable } from '@angular/core';
import { KeyValue } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/KeyValue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/infrastructure/apiservice';
import { Observable } from 'rxjs';
import { CurrentUserService } from 'src/app/infrastructure/current-user-service.service';
import { GetByDataMixingMasterIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/getByDataMixingMasterIdRequestModel';
import { DataMixingMasterMain } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master-main';
import { UpdateRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/updateRequestModel';
import { DataMixingMaster } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master';
import { DataMixingMasterUpdate } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing-master-update';
import { DataMixingMasterIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingMasterIdRequestModel';
import { DataMixingDictionaryIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingDictionaryIdRequestModel';
import { DataMixingDetailUpdateModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingDetailUpdateModel';
import { DataMixing } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing';
import { DataMixingMasterIdModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/DataMixingMasterIdModel';
import { DataMixingApprovalStatus } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingApprovalStatus';
import { ResponseModel } from 'src/app/util/modals/ResponseModel';
import { DataMixingIdRequestModel } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/dataMixingIdRequestModel';
@Injectable({
  providedIn: 'root'
})
export class ServicesService extends ApiService {

  parametersRule: KeyValue[] = [
    { "key": 1, value: "4" },
    { "key": 2, value: "5 " },
    { "key": 3, value: "2" },
    { "key": 4, value: "4" },
    { "key": 5, value: "5 " },
    { "key": 6, value: "2" },


  ];

  constructor(http: HttpClient, currentUser: CurrentUserService) {
    super(http, currentUser);
  }
  getParametersScope(): Observable<any> {
    return this.post('DataMixing/GetDataMixingScopeList');
  }
  getParametersRule(): Observable<any> {
    return this.post('DataMixing/GetDataMixingRuleList');
  }
  public getMasterAll(): Observable<any> {
    return this.post('DataMixing/GetDistinct', null);
  }
  public getTestBu(){
    return this.post('DataMixing/TestBu',null);
  }
  public getMasterById(model: GetByDataMixingMasterIdRequestModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/GetDistinctbyId', model);
  }
  public addDataMixingMaster(model: DataMixingMasterMain): Observable<any> {
    return this.post('DataMixing/AddDataMixingMaster', model);
  }
  public dataMixingUpdateMaster(newData: DataMixingMasterUpdate): Observable<any> {
    return this.post('DataMixing/UpdateDataMixingMaster', newData);
  }
  public dataMixingUpdateMasterStatus(newData: DataMixingMasterUpdate): Observable<any> {
    return this.post('DataMixing/UpdateDataMixingMasterStatus', newData);
  }

  public deleteDataMaster(newData: DataMixingMasterUpdate): Observable<any> {
    return this.post('DataMixing/DeleteDataMixingMaster', newData);
  }
  public addWithDataDictionary(newData: DataMixingMasterIdRequestModel): Observable<any> {
    return this.post('DataMixing/UpdateDataWithDataDictionary', newData);
  }
  public getDetailVersionData(model: DataMixingMasterIdRequestModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/GetDetailDataByVersion', model);
  }
  public deleteData(newData: DataMixingDictionaryIdRequestModel): Observable<any> {
    return this.post('DataMixing/DeleteDataMixing', newData);
  }
  public dataMixingUpdateDetail(newData: DataMixingDetailUpdateModel): Observable<any> {
    return this.post('DataMixing/UpdateDataMixingDetail', newData);
  }
  public getApproval(): Observable<any> {
    return this.post('DataMixing/GetApproval', null);
  }
  public uploadFiles(fileToUpload: File): Observable<boolean> {
  
    const formData: FormData = new FormData();
    formData.append('files_', fileToUpload);
    return this.post('DataMixing/UploadFiles', formData);
      
  }
  public getApproval2(id:number): Observable<any> {
    return this.post('DataMixingFiles/Download', id);
  }
  public getRoles(): KeyValue[] {
    return this.parametersRule;
  }
  public checkDetail(model: DataMixingMasterIdModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/CheckNull', model);
  }
  public checkDetailScope(model: DataMixingMasterIdModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/CheckNullScope', model);
  }
  public getApprovalStatusbyId(model: DataMixingApprovalStatus): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/GetApprovalStatusbyId', model);
  }
  public importExcelDataMixing( model: any): Observable<ResponseModel> {
    return this.postFile('DataMixing/UploadExcelFiles', model);
  }
  public importMailDataMixing( model: any): Observable<ResponseModel> {
    return this.postFile('DataMixing/UploadMailFiles',model);
  }
  public addExcelDataMixing( model: any): Observable<ResponseModel> {
    return this.postFile('DataMixing/AddDataMixingExcelMasterMain/', model);
  }
  public addMailDataMixing(model: any): Observable<ResponseModel> {
    return this.postFile('DataMixing/AddDataMixingMailMasterMain/', model);
  }
  public getExcelById(model: DataMixingIdRequestModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/GetDocumentExcelById', model);
  }
  public getMailById(model: DataMixingIdRequestModel): Observable<any> {
    return this.postWithURLSearchParams('DataMixing/GetDocumentMailById', model);
  }
}
