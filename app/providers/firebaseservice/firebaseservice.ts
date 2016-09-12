import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Firebaseservice {

  private url='https://agiletournantes-9f46b.firebaseio.com';
  constructor(private http: Http) {}

  getSponsors(){
      return this.http.get(this.url+'sponsors.json')
        .map(data=>data.json());
  }

  getInfos(){
      return this.http.get(this.url+'infos.json')
        .map(data=>data.json());
  }
}
