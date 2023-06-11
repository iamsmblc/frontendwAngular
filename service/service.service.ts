import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DataMixing } from 'src/app/dataDictionaryDescription/data-mixing-charts/models/data-mixing';
import { environment } from 'src/environments/environment';



import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = environment.baseUrl;
  mainUrl: string = this.baseUrl + 'PhysicalDataMixing';
  constructor(private httpClient: HttpClient,
    private router: Router) { }
  


  getOneFirstversion(serverName, databaseName) {
    return this.httpClient.get(this.mainUrl +'/GetDataMixingTableList' + '/'+ serverName +'/'+ databaseName);
  }

  getOneSecondversion(serverName,databaseName, schemaName,tableName) {
    return this.httpClient.get(this.mainUrl + '/GetDataMixingColumnList/' + serverName + '/' + databaseName + '/' + schemaName + '/' + tableName);
  }

}
