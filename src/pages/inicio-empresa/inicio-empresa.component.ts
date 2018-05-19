import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../../models/usuario';


@Component({
  templateUrl: './inicio-empresa.html',
})
export class InicioEmpresaComponent  {

public lista: Observable<Usuario[]>;
public empresa = {}

  constructor(public navCtrl: NavController,
              public db : AngularFirestore,
              public afAuth:AngularFireAuth) { 

    let uid = afAuth.auth.currentUser.uid;
    
    this.lista = db.collection<Usuario>('listCadEmpresa', ref => ref.where('uid','==',uid)).valueChanges();

     db.collection('usuarios').doc(uid).valueChanges().subscribe((empresa)=> {
       this.empresa = empresa;
     })



  }
}