import {Page, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {Component} from '@angular/core';
import {Headers, Http, Request, RequestMethod} from "@angular/http";
import {Mailer} from "../../providers/mailer/mailer.ts";

@Page({
  templateUrl: 'build/pages/session-detail/feedbacks.html',
  providers: [Mailer]
})
export class FeedbackPage {

  session: any;
  feedbackForm: any;

  constructor(private viewCtrl: ViewController,   public navParams: NavParams, private formBuilder: FormBuilder, private mailer:Mailer) {
    this.session = this.navParams.data;
    this.feedbackForm = formBuilder.group({
      'name': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'email': ['', [Validators.required]],
      'message': [''],
      'note': ['', [Validators.required]]
    });
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  sendFeedback(data){

    var mailTitle = "[Agile Tour Nantes] Un nouveau feedback sur votre session \""+this.session.name + "\"";

    var mailContent = "Bonjour !\n\n"+this.feedbackForm.value.name + " vient de vous envoyer un nouveau feedback sur votre session.\n\nNote : " + this.feedbackForm.value.note + "/10\n\nMessage : " + this.feedbackForm.value.message+"\n\nVous pouvez lui répondre à l'adresse suivante : "+this.feedbackForm.value.email + ".\n\nL'associaiton Agile Nantes";

    this.mailer.send("cecilia.bossard@gmail.com", mailTitle, mailContent);

    this.dismiss(data);
  }



}
