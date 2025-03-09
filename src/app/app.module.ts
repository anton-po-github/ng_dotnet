import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BlobStorageComponent } from './components/blob-storage/blob-storage.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterOutlet,
    FormsModule,
    CommonModule
  ],
  declarations: [AppComponent, BlobStorageComponent],
  providers:[provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
