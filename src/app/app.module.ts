import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { AppComponent } from './app.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatTableModule, MatTreeModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FileExplorerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatCheckboxModule,
    SplitterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
