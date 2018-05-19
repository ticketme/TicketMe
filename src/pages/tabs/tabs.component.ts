import { Component } from '@angular/core';
import { InicioUsuario } from '../inicio-usuario/inicio-usuario';
import { Configuracoes } from '../configuracoes/configuracoes.component';
import { LerQrCode } from '../ler-qrcode/ler-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsPage {

  tab1Root = InicioUsuario;
  tab3Root = Configuracoes;
  scannedCode = null;


  constructor(public barcodeScanner: BarcodeScanner) { }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    })
  }
}
