import { CriarQrCode } from './../criar-qrcode/criar-qrdcode';
import { Component } from '@angular/core';
import { Configuracoes } from '../configuracoes/configuracoes.component';
import { InicioEmpresaComponent } from '../inicio-empresa/inicio-empresa.component';




@Component({
  templateUrl: 'tabs-empresa.html'
})
export class TabsEmpresaPage {

  tab1Root = InicioEmpresaComponent;
  tab2Root = CriarQrCode;
  tab3Root = Configuracoes;


  constructor() {

  }
}
