import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../app/app-root/app.component';
import { HeaderAppComponent } from './cmps/header-app/header-app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FormsModule } from '@angular/forms';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { AppRoutingModule } from './app-routing.module';
import { EditContactComponent } from './cmps/edit-contact/edit-contact.component';
import { GoogleChartsModule } from 'angular-google-charts';
// import { ChartComponent } from './cmps/chart/chart.component';
import { AboutComponent } from './cmps/about/about.component';
import { SignupComponent } from './cmps/signup/signup.component';
import { TrensferContactComponent } from './cmps/trensfer-contact/trensfer-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
    HomePageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    ContactDetailsComponent,
    EditContactComponent,
    // ChartComponent,
    AboutComponent,
    SignupComponent,
    TrensferContactComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
