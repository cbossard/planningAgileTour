import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  templateUrl: 'build/pages/infos-page/infos-page.html',
})

export class InfosPage {

  infos=[];

  constructor(private navCtrl: NavController, confData: ConferenceData) {

    confData.getInfos().then(infos => {
      this.infos = infos;
    });
  }

}
