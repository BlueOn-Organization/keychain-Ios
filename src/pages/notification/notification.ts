import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';


/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  private usersCollection: AngularFirestoreCollection<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afs: AngularFirestore,
    ) {
      this.usersCollection = this.afs.collection('Users');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  saveDevice(){}

}
