import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import {ListItem} from "../models/list-item.model";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {
  subscriptionList: Subscription[] = [];
  searchTerm: string = "much%20wow";
  noMoreResults: boolean = false;
  API: string = `https://${environment.apiURL}?api_key=${environment.apiKey}&q=${this.searchTerm}`;
  allItems: ListItem[] = []; // all of the data from the request.
  showingItems: any = []; // kind of a shallow copy which will store the data for the loading system.
  amountOfPagesToShow:number = 2; // set here the amout of pages to pre-load.
  amountOfItemsPerPage:number = 4; // ser here the amout of items - per page.
  // just to make it little bit more readable...
  amountOfItemsPerLoad = this.amountOfItemsPerPage * this.amountOfPagesToShow;
  sum = 0; // setting sum to inital value.. will change once the request returns.
  scrollDistance = 0.8; // this is a prop that is responsible for the sensitivity of the schooling system.

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.fetchAndAssignData();
  }


  // basiclly it's just accessing the data service, getting the data and leaving only the needed parts.
  fetchAndAssignData(): void {
    this.subscriptionList.push(this.dataService.fetchDataFromAPI(this.API).subscribe((items: any) => {
      this.allItems = items.data
        .filter((item: any) => item.id !== null && item.embed_url !== null)
        .map((gifEl: any) => {
          return {
            id: gifEl.id,
            embed_url: gifEl.images.original.url
          }
        });
      this.initScrollingData(); // dependent on the response.
    }));
  }

  // initalize the scrolling data
  initScrollingData(): void {
    this.sum = this.amountOfItemsPerPage; // start at [ 0 to 4 ]
    this.addItems(0, this.sum);
  }

  // adding data to the currently showing data
  addItems(startIndex:any, endIndex: any,) {
    for (let i = this.showingItems.length; i < this.sum; ++i) {
      if (this.allItems[i]) {
        this.showingItems.push((this.allItems[i]));
      }
      else {
        // could make it faster, just do the if check outside.  for time sake leaving it.
        this.noMoreResults = true;
      }
    }
  }

  onScrollDown(): void {
    const start = this.sum;
    this.sum += this.amountOfItemsPerPage * this.amountOfPagesToShow;
    this.addItems(start, this.sum);
  }

  ngOnDestroy(): void {
    // Memory mangement is important!
    this.subscriptionList.forEach((sub: Subscription) => sub.unsubscribe())
  }


}
