import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CardPromo } from '../../models/cardPromo';

@Component({
  templateUrl: './criar-promo.html'
})
export class CriarPromo {
  public lista: Observable<CardPromo[]>;
  public cardPromo = {}
  
  constructor(private navCtrl: NavController,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private alertCtrl: AlertController) { 

      let uid = afAuth.auth.currentUser.uid;
      this.lista = db.collection<CardPromo>('listCardPromo', ref => ref.where('uid','==',uid)).valueChanges();
            
      db.collection('promocoes').doc(uid).valueChanges().subscribe((cardPromo)=> {
        this.cardPromo = cardPromo;
      })      
            
}


  public registrarPromo(form: NgForm): void{

   let nome: string = form.value.nome;
   let pontos: string = form.value.pontos;
   let dateEndPromo: Date = form.value.dateEndPromo;

      this.db.collection("promocoes/").doc("uid")
       .set({
         nome: nome,
         pontos:pontos,
         dateEndPromo:dateEndPromo
       })
       .catch((error)=>{
         this.alertCtrl.create({
           title:"Erro no registro",
           subTitle: error.message,
           buttons: ["Ok"]
           
         }).present();
       })
    }

}


