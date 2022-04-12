import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ItemsListComponent } from './items-list/items-list.component';
import {HttpClientModule} from "@angular/common/http";
import { SingleItemComponent } from './items-list/single-item/single-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    SingleItemComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
