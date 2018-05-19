import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CardPromo } from '../../models/cardPromo';

@Component({
  templateUrl: './criar-qrcode.html'
})
export class CriarQrCode {
  public lista: Observable<CardPromo[]>;
  public cardPromo = {}
  
  qrNome = null;
  qrPonto = null;
  valueQr:any;

  conteudoCard:any={
    nome:null,
    pontos: null
  };
  
  constructor(private navCtrl: NavController,
              private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private alertCtrl: AlertController) { 

      let uid = afAuth.auth.currentUser.uid;
      this.lista = db.collection<CardPromo>('listCardPromo', ref => ref.where('uid','==',uid)).valueChanges();
            
      db.collection('cartaoPromocao').doc(uid).valueChanges().subscribe((cardPromo)=> {
        this.cardPromo = cardPromo;
      })      
            
}

  public createCode() {
    this.conteudoCard.nome = this.qrNome;
    this.conteudoCard.pontos = this.qrPonto;
    this.valueQr = JSON.stringify(this.conteudoCard);
    
    
  }


  public registrarCard(form: NgForm): void{

   let nome: string = form.value.nome;
   let pontos: string = form.value.pontos;


      this.db.collection("cartaoPromocao/").doc("cartaoPromocao")
       .set({
         nome: nome,
         pontos:pontos
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


