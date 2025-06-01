import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type UniversalFieldType = 'text' | 'email' | 'number' | 'file';

export interface IUniversalDialogDataFields {
  name: string;
  label: string;
  type?: UniversalFieldType;
  required?: boolean;
}

export interface IUniversalDialogData {
  mode: 'create' | 'update';
  typeDialog: string;
  entity?: Record<string, any>;
  fields: IUniversalDialogDataFields[];
}

@Component({
  selector: 'app-universal-dialog',
  templateUrl: './universal-dialog.component.html',
  standalone: false
})
export class UniversalDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<UniversalDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as IUniversalDialogData;

  public form: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    for (const field of this.data.fields) {
      const isFile = field.type === 'file';
      const defaultValue = !isFile
        ? this.data.entity?.[field.name] ?? ''
        : null;

      const control = this.fb.control(
        defaultValue,
        field.required ? Validators.required : []
      );

      this.form.addControl(field.name, control);
    }
  }

  public onFileSelected(fieldName: string, fileData: any): void {
    this.form.get(fieldName)?.setValue({
      file: fileData,
      type: fileData?.type
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
