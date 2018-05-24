import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Services
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Componentes
import { LoginComponent } from '../pages/login/login.component';
import { RegistroUsuarioComponent } from '../pages/registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from '../pages/registro-empresa/registro-empresa.component';
import { InicioUsuario } from '../pages/inicio-usuario/inicio-usuario';
import { TabsPage } from '../pages/tabs/tabs.component';
import { TabsEmpresaPage } from '../pages/tabs-empresa/tabs-empresa';

import { Configuracoes } from '../pages/configuracoes/configuracoes.component';
import { MeusDados } from '../pages/meus-dados/meus-dados.component';
import { InicioEmpresaComponent } from '../pages/inicio-empresa/inicio-empresa.component';


import { CriarPromo } from '../pages/criar-promo/criar-promo';
import { LerQrCode } from '../pages/ler-qrcode/ler-qrcode';

// QRcode
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";



const config = {
    apiKey: "AIzaSyDsrV_OZcvC0jflTJaXkXn09nVuD8Va4Z8",
    authDomain: "ticketmeapp-97.firebaseapp.com",
    databaseURL: "https://ticketmeapp-97.firebaseio.com",
    projectId: "ticketmeapp-97",
    storageBucket: "ticketmeapp-97.appspot.com",
    messagingSenderId: "1044307920488"
  };

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroEmpresaComponent,
    InicioUsuario,
    InicioEmpresaComponent,
    TabsPage,
    TabsEmpresaPage,
    Configuracoes,
    MeusDados,
    CriarPromo,
    LerQrCode
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    RegistroUsuarioComponent,
    RegistroEmpresaComponent,
    InicioUsuario,
    InicioEmpresaComponent,
    TabsPage,
    TabsEmpresaPage,
    Configuracoes,
    MeusDados,
    CriarPromo,
    LerQrCode
    
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}