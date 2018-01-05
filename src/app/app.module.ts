import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MarkdownModule} from 'ngx-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';

import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MonacoComponent} from './monaco/monaco.component';

@NgModule({
    declarations: [
        AppComponent,
        MonacoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MarkdownModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
