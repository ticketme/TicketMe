import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LoginComponent} from '../pages/login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs.component';
import { TabsEmpresaPage } from '../pages/tabs-empresa/tabs-empresa';
import {AngularFirestore} from 'angularfire2/firestore';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;


  

  constructor(platform: Platform,
              public afAuth:AngularFireAuth,
              public db:AngularFirestore) {
    platform.ready().then(() => {

      // afAuth.auth.signOut();
        afAuth.authState.subscribe((state) => {
            if(state == null)
              this.rootPage = LoginComponent;
              else {
                console.log(state.uid);
                let sub = this.db.collection('usuarios').doc<any>(state.uid).valueChanges().subscribe((user) => {
                    console.log(user);
                    if(user.tipo == 'usuario') {
                      this.rootPage = TabsPage;
                    }
                    else {
                      this.rootPage = TabsEmpresaPage;
                    }
                    sub.unsubscribe();
                });
                
               
              }
        });

    });
    
  }

}
