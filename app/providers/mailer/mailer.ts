import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Headers, Http, Request, RequestMethod} from "@angular/http";

/*
  Generated class for the Mailer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Mailer {

  mailgunUrl: string;
  mailgunApiKey: string;
  sender: string;

  constructor(private http: Http) {
    this.http = http;
    this.mailgunUrl = "sandboxa0f2f349b51345a3ba005d25ada92cde.mailgun.org";
    this.mailgunApiKey = window.btoa("api:key-92f8f206c7b545b6263414e9158bdb42");
    this.sender = "contact@agilenantes.org";
  }

  send(recipient: string, subject: string, message: string) {
        var requestHeaders = new Headers();
        requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
        requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from="+this.sender+"&to=" + recipient + "&subject=" + subject + "&text=" + message,
            headers: requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
