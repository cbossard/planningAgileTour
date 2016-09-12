import { Component } from '@angular/core';

import { PopoverController, ViewController } from 'ionic-angular';

import { Infos } from '../../providers/info-service/infos';
import { Sponsor } from '../../providers/sponsor-service/sponsor';

import { InfoService } from '../../providers/info-service/info-service';
import { SponsorService } from '../../providers/sponsor-service/sponsor-service';
import { Firebaseservice } from '../../providers/firebaseservice/firebaseservice';

import { InAppBrowser } from 'ionic-native';
import { OnInit } from '@angular/core';

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
  templateUrl: 'build/pages/about/about.html',
  providers: [SponsorService, InfoService]
})
export class AboutPage implements OnInit{
  sponsors: Sponsor[];
  infos: Infos[];
  
  constructor(public popoverCtrl: PopoverController, private sponsorService: SponsorService, private infoService: InfoService) {}

  ngOnInit(){
    this.getSponsors();
    this.getInfos();
  }

  getSponsors(){

    this.sponsorService.getSponsors().subscribe(
      sponsors => this.sponsors = sponsors
    );
  }

  getInfos(){
    this.infoService.getInfos().subscribe(
      infos => this.infos = infos
    );
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  openURL(sponsor){
    new InAppBrowser(sponsor.url, '_system');
  }
}
