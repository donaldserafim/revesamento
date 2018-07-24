import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { CadastroProvaPage } from '../pages/cadastro-prova/cadastro-prova';
import { CheckInPage } from '../pages/check-in/check-in';
import { ColocacaoPage } from '../pages/colocacao/colocacao';


import { FIREBASE_CONFIG } from './firebase.credetials';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { NotificationProvider } from '../providers/notification/notification';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    CadastroProvaPage,
    CheckInPage,
    ColocacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    CadastroProvaPage,
    CheckInPage,
    ColocacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    NotificationProvider,
  ]
})
export class AppModule {}