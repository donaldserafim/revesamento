import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NotificationProvider } from '../../providers/notification/notification';
import { CheckInPage } from '../check-in/check-in';

@IonicPage()
@Component({
  selector: 'lista-trechos',
  templateUrl: 'lista-trechos.html',
})
export class ListaTrechosPage {

  lista: any;
  filtro: any;
  size: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, 
  			  public notificationProvider: NotificationProvider) {
    this.lista = firebaseProvider.listar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTrechosPage');
  }

  checkIn(prova,trecho) {
    this.navCtrl.push(CheckInPage, {
      prova: prova,
      trecho: trecho
      });
  }
}