import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

import { InAppBrowser } from 'ionic-native';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Learn Ionic</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  sponsors=[];
  infos=[];

  constructor(public popoverCtrl: PopoverController, confData: ConferenceData) {
    confData.getSponsors().then(sponsors => {
      this.sponsors = sponsors;
    });

    confData.getInfos().then(infos => {
      this.infos = infos;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  openURL(sponsor){
    new InAppBrowser(sponsor.url, '_system');
  }
}
