import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import {Infos} from './infos.ts';
import {SERVER_URL} from '../config/config.ts';


@Injectable()
export class InfoService {

  private infosUrl = 'eventInfos.json';  // URL to web api


  constructor(private http: Http) { }

  getInfos(): Observable<Infos[]> {

    return this.http.get(SERVER_URL + this.infosUrl)
                   .map(this.extractData);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || { };
  }

}
