import { NgModule } from '@angular/core';

import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const matModules = [
  FlexLayoutModule,
  MatButtonModule,
  MatIconModule,
  MatSortModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatSidenavModule,
  MatDividerModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
  MatToolbarModule,
  MatRippleModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTooltipModule,
  TextFieldModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: matModules,
  exports: matModules
})
export class MaterialModules {}
