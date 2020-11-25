import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from "./services/auth.service";
import { TabsPage } from "./tabs/tabs.page";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  rootPage: any = TabsPage;
  authUser: Subscription;
  currentUser: User;

  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar,
               public auth: AuthService, public router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.authUser = this.auth.user$.subscribe(async (user) => {
      this.currentUser = user;

      if (this.currentUser && this.currentUser.uid) {
        await this.router.navigate(['tabs/calendar']);
      }
    })
  }
}
