import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseProvider {
  private basePath = 'revesamento';
  private basePathCheckIn = 'checkin';

  private credenciaisCollection: AngularFirestoreCollection<any>;

  constructor(
    public firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    firestore.firestore.settings({ timestampsInSnapshots: true });
    // firestore.firestore.settings({ timestampsInSnapshots: true });
    // console.log('Hello FirebaseProvider Provider');
  }

  listar() {
    this.credenciaisCollection = this.firestore.collection<any>(this.basePath);
    return this.credenciaisCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  listarCheckInPorTrecho(prova,trecho) {
    this.credenciaisCollection = this.firestore.collection<any>(this.basePathCheckIn, ref => ref.where('prova', '==', prova.prova).where('trecho', '==', trecho.trecho));
    return this.credenciaisCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  uploadOneToFirebase(imgBlob: any) {
    return new Promise((resolve, reject) => {
      var filePath = 'imagens/' + this.generateUUID() + '.jpeg';

      var uploadTask = this.storage
        .ref(filePath)
        .putString(imgBlob, 'data_url');

      console.log('New file: ' + filePath);

      uploadTask.percentageChanges().subscribe(value => {
        console.log('percentageChanges: ' + value.toFixed(2) + '%');
      });
      uploadTask.downloadURL().subscribe(value => {
        console.log('downloadURL: ' + value);
        resolve(value);
      });
    });
  }

  generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      var r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  addItem(item: any) {
    if (item.id) {
      return this.update(item);
    }
    const postId: string = this.firestore.createId();
    console.log('New post Id: ' + postId);
    return this.firestore
      .doc<any>(`${this.basePath}/${postId}`)
      .set({ ...item });
  }

  addItemCheckIn(item: any) {
    if (item.id) {
      return this.updateCheckIn(item);
    }
    const postId: string = this.firestore.createId();
    console.log('New post Id: ' + postId);
    return this.firestore
      .doc<any>(`${this.basePathCheckIn}/${postId}`)
      .set({ ...item });
  }

  delete(item: any) {
    return this.firestore.doc<any>(`${this.basePath}/${item.id}`).delete();
  }

  update(item: any) {
    return this.firestore.doc<any>(`${this.basePath}/${item.id}`).update(item);
  }

  updateCheckIn(item: any) {
    return this.firestore.doc<any>(`$this.basePathCheckIn/${item.id}`).update(item);
  }
}