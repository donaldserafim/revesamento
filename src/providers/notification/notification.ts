// Angular
import { Injectable } from '@angular/core';

// Ionic
import {
    Loading,
    LoadingController,
    ToastController
} from 'ionic-angular';

@Injectable()
export class NotificationProvider {

    private loader: Loading;

    constructor(private loadCtrl: LoadingController, private toastCtrl: ToastController) { }

    public closeLoading(): void {
        if (this.loader) {
            this.loader.dismiss();
            delete this.loader;
        }
    }

    public showError(message: string): void {
        this.toastCtrl.create({
            closeButtonText: 'X',
            cssClass: 'alert-message',
            dismissOnPageChange: true,
            duration: 5000,
            message,
            position: 'top',
            showCloseButton: true
        }).present();
    }

    public showInfo(message: string, duration?: number): void {
        this.toastCtrl.create({
            closeButtonText: 'X',
            dismissOnPageChange: true,
            duration: duration || 5000,
            message,
            position: 'top',
            showCloseButton: true
        }).present();
    }

    public showLoading(): void {
        this.loader = this.loadCtrl.create({
            content: 'Por favor aguarde...',
            duration: 5000,
            spinner: 'crescent'
        });
        this.loader.present();
    }

}