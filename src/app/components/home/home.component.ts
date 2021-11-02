import { Component, OnInit } from '@angular/core';
import {ApirequestService} from "../../services/apirequest/apirequest.service";
import {ApiUrlService} from "../../services/api-url/api-url.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public assetList: any = [];
  public count = 0;
  public logOutLoader = false;
  public errorMessage = '';

  constructor(
    private _req: ApirequestService,
    private _url: ApiUrlService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.getPropertiesList();
  }

  public getPropertiesList() {
    this._req.fetchApiData(this._url.propertyListUrl).subscribe(
      (data: any) => {
        let resSucc = data.data;
        let resError = data.error;
        if (resSucc != '') {
          this.assetList = resSucc;
          this.count = resSucc.length;
          this.logOutLoader = false;
        } else {
          this.assetList = [];
          this.errorMessage = resError['Error Description'];
          this.logOutLoader = false;
        }
      },
      error => { },
      () => {
        // this.showLoader = false;
      }
    )
  }

  public gettoDetails(compId: number) {
    this._route.navigate(['/details', compId]);
  }

}
