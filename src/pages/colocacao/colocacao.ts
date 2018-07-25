import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NotificationProvider } from '../../providers/notification/notification';

@IonicPage()
@Component({
  selector: 'page-colocacao',
  templateUrl: 'colocacao.html',
})
export class ColocacaoPage {

	lista: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider:FirebaseProvider, public notificationProvider: NotificationProvider) {
  	this.lista = firebaseProvider.listarColocacao();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColocacaoPage');
  }

}
