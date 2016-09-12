import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import {Speaker} from './speaker.ts';
import {SERVER_URL} from '../config/config.ts';


@Injectable()
export class SpeakerService {

  private speakerUrl = 'speakers.json';  // URL to web api


  constructor(private http: Http) { }

  getSpeakers(): Observable<Speaker[]> {

    return this.http.get(SERVER_URL + this.speakerUrl)
                   .map(this.extractData);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || { };
  }


}
