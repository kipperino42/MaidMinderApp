import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ionic4DatepickerModule } from    '@logisticinfotech/ionic4-datepicker';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";
import {EventCreatorComponent} from "./event-creator/event-creator.component";

@NgModule({
  declarations: [AppComponent, EventCreatorComponent],

  entryComponents: [],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
