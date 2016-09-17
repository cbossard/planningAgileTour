import { Component } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

import { FeedbackPage } from './feedbacks';

@Component({
  templateUrl: 'build/pages/session-detail/session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(public navParams: NavParams,  public modalCtrl: ModalController) {
    this.session = navParams.data;
  }

  showModal() {
    let modal = this.modalCtrl.create(FeedbackPage, this.session);
    modal.present();

  }
}
