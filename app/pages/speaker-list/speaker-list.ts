import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { OnInit } from '@angular/core';

import { Speaker } from '../../providers/speaker-service/speaker';
import { SpeakerService } from '../../providers/speaker-service/speaker-service';

import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';


@Component({
  templateUrl: 'build/pages/speaker-list/speaker-list.html',
  providers: [SpeakerService]
})

export class SpeakerListPage implements OnInit {
  actionSheet: ActionSheet;
  speakers: Speaker[];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, private speakerService: SpeakerService) {
  }

  ngOnInit(){
    this.getSpeakers();
  }

  getSpeakers(){
    this.speakerService.getSpeakers().subscribe(
      speakers => this.sortSpeakers(speakers)
    );
  }

  sortSpeakers(speakers){
    speakers.sort((a, b) => {
      let aName = a.name.split(' ').pop();
      let bName = b.name.split(' ').pop();
      return aName.localeCompare(bName);
    });

    this.speakers = speakers;
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
