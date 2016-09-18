import {Page, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {Component} from '@angular/core';
import {Headers, Http, Request, RequestMethod} from "@angular/http";

@Page({
  templateUrl: 'build/pages/session-detail/feedbacks.html'
})
export class FeedbackPage {

  session: any;
  feedbackForm: any;

  http: Http;
  mailgunUrl: string;
  mailgunApiKey: string;

  sender: string;


  constructor(private viewCtrl: ViewController,   public navParams: NavParams, private formBuilder: FormBuilder, http: Http) {
    this.session = this.navParams.data;
    this.feedbackForm = formBuilder.group({
      'firstName': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'lastName': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'email': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'message': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      'note': ['', [Validators.required]]
    });


    this.http = http;
    this.mailgunUrl = "sandboxa0f2f349b51345a3ba005d25ada92cde.mailgun.org";
    this.mailgunApiKey = window.btoa("api:key-92f8f206c7b545b6263414e9158bdb42");
    this.sender = "contact@agilenantes.org";
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  sendFeedback(data){

    var mailTitle = "[Agile Tour Nantes] Un nouveau feedback sur votre session \""+this.session.name + "\"";

    var mailContent = "Bonjour !\n\n"+this.feedbackForm.value.firstName + " " +this.feedbackForm.value.lastName +" vient de vous envoyer un nouveau feedback sur votre session.\n\nNote : " + this.feedbackForm.value.note + "/10\n\nMessage : " + this.feedbackForm.value.message+"\n\nVous pouvez lui répondre à l'adresse suivante : "+this.feedbackForm.value.email + ".\n\nL'associaiton Agile Nantes";

    this.send("cecilia.bossard@gmail.com", mailTitle, mailContent);

    this.dismiss(data);
  }

  send(recipient: string, subject: string, message: string) {
        var requestHeaders = new Headers();
        requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
        requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from="+this.sender+"&to=" + recipient + "&subject=" + subject + "&text=" + message,
            headers: requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
