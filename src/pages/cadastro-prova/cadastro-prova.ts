import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the CadastroProvaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-prova',
  templateUrl: 'cadastro-prova.html',
})
export class CadastroProvaPage {

  public model: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,public notificationProvider: NotificationProvider) {
	this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroProvaPage');
    
  }

   init() {
    this.model = {
      prova: '',
      quantidadeTrechos: '',
      horarioLargada: ''
    };
  }

  async salvar() {
      this.notificationProvider.showLoading();
      
      let trechos = [];
      for (var i = 1; i <= this.model.quantidadeTrechos; i++) {
        let trecho = {
          trecho: "Trecho "+i,
          numero: i
        };
        trechos.push(trecho);
      }

      this.model.trechos = trechos;
      console.log(trechos);

      this.firebaseProvider
      .addItem(this.model)
      .then(() => {
        this.init();
        this.notificationProvider.showInfo('Salvo com sucesso.');
        this.notificationProvider.closeLoading();
      })
      .catch(error => {
        this.notificationProvider.closeLoading();
        this.notificationProvider.showError(error.message);
      });

  }

}
