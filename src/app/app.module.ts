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

import { SharedModule } from './components/shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ChatComponent } from './components/SignalR-chat/chat/chat.component';
import { BlobStorageComponent } from './components/blob-storage/blob-storage.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ChatComponent,
    HomeComponent,
    BlobStorageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'signalr-chat', component: ChatComponent },
      { path: 'az-blob-storage', component: BlobStorageComponent },

      {
        path: 'books',
        loadChildren: () =>
          import('./components/books/books.module').then((m) => m.BooksModule)
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./components/products/products.module').then(
            (m) => m.ProductsModule
          )
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.module').then((m) => m.UsersModule)
      },

      {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then((m) => m.AuthModule)
      }
    ])
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
