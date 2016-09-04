import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';


@Component({
  templateUrl: 'build/pages/speaker-list/speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, confData: ConferenceData) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName: string) {
    this.navCtrl.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_system');
  }
}
