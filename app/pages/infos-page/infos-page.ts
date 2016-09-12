import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core';

import { Infos } from '../../providers/info-service/infos';
import { InfoService } from '../../providers/info-service/info-service';

@Component({
  templateUrl: 'build/pages/infos-page/infos-page.html',
  providers: [InfoService]
})

export class InfosPage {

  infos: Infos[];

  constructor(private navCtrl: NavController, private infoService: InfoService) {
  }

  ngOnInit(){
    this.getInfos();
  }

  getInfos(){
    this.infoService.getInfos().subscribe(
      infos => this.infos = infos
    );
  }

}
