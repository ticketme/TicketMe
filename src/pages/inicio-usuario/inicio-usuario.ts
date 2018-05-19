import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../../models/usuario';


@Component({
  templateUrl: 'inicio-usuario.html'
})
export class InicioUsuario {

public lista: Observable<Usuario[]>;
public user = {}
 

  constructor(public navCtrl: NavController,
              public db : AngularFirestore,
              public afAuth:AngularFireAuth) { 

    let uid = afAuth.auth.currentUser.uid;
    
    this.lista = db.collection<Usuario>('listCadUser', ref => ref.where('uid','==',uid)).valueChanges();

     db.collection('usuarios').doc(uid).valueChanges().subscribe((user)=> {
       this.user= user;
     })



  }

}