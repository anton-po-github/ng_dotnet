import { HttpClient } from '@angular/common/http';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as saveAs from 'file-saver';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blob-storage',
  templateUrl: './blob-storage.component.html',
  styleUrls: ['./blob-storage.component.scss'],
  standalone: false
})
export class BlobStorageComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef;

  files: string[] = [];
  fileToUpload!: FormData;
  showLoader!: boolean;

  private url = environment.baseUrl + 'api/azurestorage';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showBlobs();
  }

  showBlobs() {

    this.showLoader = true;

    this.http.get<string[]>(this.url + '/listfiles')
      .subscribe({
        next: (result) => {
          this.files = result
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.showLoader = false;
        }
      });
  }

  onClick() {

    console.log('object');

    let fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {

      this.showLoader = true;

      const file = fileUpload.files[0];

      let formData: FormData = new FormData();

      formData.append("asset", file, file.name);

      this.http.post(this.url + '/insertfile', formData)
        .subscribe({
          next: (response: any) => {
            if (response == true) {
              this.showBlobs();
            }
          },
          error: (err) => {
            console.error(err);
            this.showLoader = false;
          },
          complete: () => {
          }
        });
    };
    fileUpload.click();
  }

  downloadFile(fileName: string) {
    this.showLoader = true;
    return this.http.get(this.url + '/downloadfile/' + fileName, { responseType: "blob" })
      .subscribe({
        next: (result: any) => {
          if (result.type != 'text/plain') {
            var blob = new Blob([result]);
            let file = fileName;
            saveAs(blob, file);
          }
          else {
            alert('File not found in Blob!');
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.showLoader = false;
        }
      });
  }

  deleteFile(fileName: string) {
    var del = confirm('Are you sure want to delete this file');

    if (!del) return;

    this.showLoader = true;

    this.http.get(this.url + '/deletefile/' + fileName)
      .subscribe({
        next: (result: any) => {

          if (result != null) {

            this.showBlobs();
          }
        },
        error: (err) => {
          console.error(err);
          this.showLoader = false;
        },
        complete: () => {
        }
      });
  }

}
