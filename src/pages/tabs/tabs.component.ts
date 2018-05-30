import { Component } from '@angular/core';
import { InicioUsuario } from '../inicio-usuario/inicio-usuario';
import { Configuracoes } from '../configuracoes/configuracoes.component';
import { LerQrCode } from '../ler-qrcode/ler-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsPage {

  tab1Root = InicioUsuario;
  tab3Root = Configuracoes;
  scannedCode = null;


  constructor(public barcodeScanner: BarcodeScanner,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { }

  public logout(): void {
    this.afAuth.auth.signOut();
  }
  scanCode() {

    let stop = false;

    if (stop == false) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        let uid = this.afAuth.auth.currentUser.uid;

        let subPromo = this.db.collection("promocoes").doc<any>(barcodeData.text).valueChanges().subscribe((dados) => {

          let subPart = this.db.collection("usuarios").doc(uid).collection("participacoes").doc<any>(barcodeData.text).valueChanges().subscribe((premiacao) => {
            console.log('versão nova');

            let _dados = dados;
            let _premiacao = premiacao;

            subPart.unsubscribe();
            subPromo.unsubscribe();

            if (stop == false) {
              if (_premiacao == null) {

                this.db.collection("usuarios").doc(uid).collection("participacoes").doc(barcodeData.text).set({
                  id: barcodeData.text,
                  pontos: 1,
                  pontos_totais: _dados.pontos,
                  nome: _dados.nome,
                  nomeEmpresa: _dados.nomeEmpresa
                }).then(() => {
                  stop = true;
                })
              }
              else {
                let novos_pontos = _premiacao.pontos + 1;
                this.db.collection("usuarios").doc(uid).collection("participacoes").doc(barcodeData.text).update({
                  pontos: novos_pontos
                }).then(() => {
                  stop = true;
                })
              }
            }
          })

        })
      })
    }
  }
}
