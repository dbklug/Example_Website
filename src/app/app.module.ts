import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DonateComponent } from './donate/donate.component';
import { FooterComponent } from './footer/footer.component';
import { ToasterService } from './toaster-service.service';
import { FormsModule } from '@angular/forms';
import { ArchiveComponent } from './archive/archive.component';
import { TextbookComponent } from './textbook/textbook.component';
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import * as $ from 'jquery';
import { AdminComponent } from './admin/admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DonateComponent,
    ArchiveComponent,
    FooterComponent,
    TextbookComponent,
    AdminComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

enableProdMode();
