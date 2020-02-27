import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';  
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule
  ],
  declarations: []
})
export class MaterialModule { }
