import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import {SERVER_URL} from '../config/config.ts';
import { UserData } from './user-data';
import {Speaker} from './speaker.ts';

@Injectable()
export class ScheduleService {


  data: any;
  speakers: any;

  private scheduleUrl = 'schedule.json';  // URL to web api
  private speakerUrl = 'speakers.json';  // URL to web api

  constructor(private http: Http, public user: UserData) {}

  getSpeakers(): Observable<Speaker[]> {

    return this.http.get(SERVER_URL + this.speakerUrl)
                   .map(this.extractData);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || { };
  }



  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      // TODO
      this.speakers = [{"about":"Burt is a Bear.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Pierre Meisel","profilePic":"img/speakers/bear.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Charlie is a Cheetah.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Romain Bethoux","profilePic":"img/speakers/cheetah.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Donald is a Duck.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Erwan Charamel","profilePic":"img/speakers/duck.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Eva is an Eagle.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Matthieu Lepape","profilePic":"img/speakers/eagle.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Ellie is an Elephant.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Axel Villechalane","profilePic":"img/speakers/elephant.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Gino is a Giraffe.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Benoit Tisserand","profilePic":"img/speakers/giraffe.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Isabella is an Iguana.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Cédric Bodin","profilePic":"img/speakers/iguana.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Karl is a Kitten.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Guillaume Deberdt","profilePic":"img/speakers/kitten.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Lionel is a Lion.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Elodie Nedelec","profilePic":"img/speakers/lion.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Molly is a Mouse.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Frédéric Dufau-Joël","profilePic":"img/speakers/mouse.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Paul is a Puppy.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Jean-Luc Guillou","profilePic":"img/speakers/puppy.jpg","twitter":"ionicframework"},{"about":"Rachel is a Rabbit.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Jérôme Dard","profilePic":"img/speakers/rabbit.jpg","society":"A Corp.","twitter":"ionicframework"},{"about":"Ted is a Turtle.","github":"ionic","googlePlus":"ionic","location":"Everywhere","name":"Armel Cusin-Gogat","profilePic":"img/speakers/turtle.jpg","society":"A Corp.","twitter":"ionicframework"}];


      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(SERVER_URL + this.scheduleUrl).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  private processSpeakers(res: Response){
    let body = res.json();
    return body || { };
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions

    data.tracks = [];

    // loop through each timeline group in the day
    data[0].groups.forEach(group => {
      // loop through each session in the timeline group
      group.sessions.forEach(session => {
        this.processSession(data, session);
      });
    });

    return data;
  }

  processSession(data, session) {
    // loop through each speaker and load the speaker data
    // using the speaker name as the key
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        let speaker = this.speakers.find(s => s.name === speakerName);
        if (speaker) {

          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if (session.tracks) {
      session.tracks.forEach(track => {
        if (data.tracks.indexOf(track) < 0) {
          data.tracks.push(track);
        }
      });
    }
  }

  getTimeline(dayIndex, queryText = '', excludeTracks = [], segment = 'all') {
    return this.load().then(data => {
      let day = data[0];
      day.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      day.groups.forEach(group => {
        group.hide = true;

        group.sessions.forEach(session => {
          // check if this session should show or not
          this.filterSession(session, queryWords, excludeTracks, segment);

          if (!session.hide) {
            // if this session is not hidden then this group should show
            group.hide = false;
            day.shownSessions++;
          }
        });

      });

      return day;
    });
  }


  filterSession(session, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach(trackName => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getTracks() {
    return this.load().then(data => {
      return data.tracks.sort();
    });
  }


}
