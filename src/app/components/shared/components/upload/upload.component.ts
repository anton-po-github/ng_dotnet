import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: false
})
export class UploadComponent implements OnInit {
  @ViewChild('inputFile')
  public inputFile = {} as ElementRef;
  @Output() fileImage = new EventEmitter<File>();

  public progress: number;
  public message: string;
  constructor() {}

  ngOnInit(): void {}

  public onUploadFile(): void {
    if (this.inputFile) {
      this.inputFile.nativeElement.click();
    }
  }

  public upload(event) {
    this.fileImage.emit(event.target.files[0]);

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        //  this.asset.imageUrl = e.target.result;
      };
      //  this.fileImage.emit(reader.readAsDataURL(event.target.files[0]));
    }
  }

  /* public uploadFormData(files) {
     if (files.length === 0)
       return;
     const formData = new FormData();
     for (const file of files) {
     //  formData.append(file.name, file);
       formData.append('file', file);
     }
     this.fileImage.emit(formData);
   }
 */
}
