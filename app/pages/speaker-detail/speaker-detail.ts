import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';
import { InAppBrowser } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/speaker-detail/speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerTwitter(speaker){
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_system');
  }

  goToSpeakerGooglePlus(speaker){
    new InAppBrowser(`  https://plus.google.com/+${speaker.googlePlus}`, '_system');
  }

  goToSpeakerGithub(speaker){
    new InAppBrowser(`https://github.com/${speaker.github}`, '_system');
  }
}
