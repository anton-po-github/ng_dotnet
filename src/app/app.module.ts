import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UploadComponent } from './fetch-data/upload/upload.component';
import { HomeComponent } from './components/home/home.component';
import { SignalrComponent } from './components/signalr/signalr.component';
import { BlobStorageComponent } from './components/blob-storage/blob-storage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UploadComponent,
    SignalrComponent,
    FetchDataComponent,
    BlobStorageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'signalr', component: SignalrComponent },
      { path: 'az-blob-storage', component: BlobStorageComponent },
    ])
  ],
  providers: [
    provideCharts(withDefaultRegisterables()), 
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
