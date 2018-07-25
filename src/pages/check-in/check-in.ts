import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NotificationProvider } from '../../providers/notification/notification';

@IonicPage()
@Component({
  selector: 'page-check-in',
  templateUrl: 'check-in.html',
})
export class CheckInPage {
  
  public model: any;
  prova: any;
  trecho: any;
  lista: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider:FirebaseProvider, public notificationProvider: NotificationProvider) {
    this.prova = navParams.get('prova');
    this.trecho = navParams.get('trecho');
    this.init();
    this.lista = firebaseProvider.listarCheckInPorTrecho(this.prova,this.trecho);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckInPage');
  }

  init() {
    this.model = {
      prova: this.prova.prova,
      trecho: this.trecho.trecho,
      equipe: '',
      horario: ''
    };
  }

  checkIn() {

    this.notificationProvider.showLoading();
    var data = new Date();
    this.model.horario = data;

    this.firebaseProvider
      .addItemCheckIn(this.model)
      .then(() => {
        this.init();
        this.notificationProvider.showInfo('CheckIn efetuado com sucesso.');
        this.notificationProvider.closeLoading();
      })
      .catch(error => {
        this.notificationProvider.closeLoading();
        this.notificationProvider.showError(error.message);
      });

    var colocacao = this.firebaseProvider.getColocacao(this.model.equipe);

    var entrou = false;
    colocacao.subscribe(lists=>{
        lists.forEach(coloc=>{
          console.log("passou");
          console.log(coloc);
          entrou = true;
          this.firebaseProvider.updateColocacao(coloc);
        })
    });

    if(!entrou){
      console.log("passou 2");
      var colocacao_new = {
          equipe: this.model.equipe,
          horario: data
      };
      this.firebaseProvider.addItemColocacao(colocacao_new);
    }
  }
}