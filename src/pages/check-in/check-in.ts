import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NotificationProvider } from '../../providers/notification/notification';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {

  lista: any;
  filtro: any;
  size: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, 
  			  public notificationProvider: NotificationProvider) {
    this.lista = firebaseProvider.listar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  checkIn(prova,trecho) {
    console.log(prova);
    console.log(trecho);
  }
}
