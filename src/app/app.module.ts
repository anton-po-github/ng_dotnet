import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './SignalR-chat/chat/chat.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UploadComponent } from './fetch-data/upload/upload.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BlobStorageComponent } from './components/blob-storage/blob-storage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ChatComponent,
    HomeComponent,
    UploadComponent,
    FetchDataComponent,
    BlobStorageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'signalr-chat', component: ChatComponent },
      { path: 'az-blob-storage', component: BlobStorageComponent },

      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.module').then((m) => m.UsersModule)
      },

      {
        path: 'auth',
        loadChildren: () =>
          import('./components/account/account.module').then(
            (m) => m.AccountModule
          )
      }
    ])
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
