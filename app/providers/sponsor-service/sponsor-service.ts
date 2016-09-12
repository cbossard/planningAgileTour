import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import {Sponsor} from './sponsor.ts';
import {SERVER_URL} from '../config/config.ts';


@Injectable()
export class SponsorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private sponsorsUrl = 'sponsors.json';  // URL to web api


  constructor(private http: Http) { }

  getSponsors(): Observable<Sponsor[]> {

    return this.http.get(SERVER_URL + this.sponsorsUrl)
                   .map(this.extractData);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || { };
  }


}
