import {Component, Input, OnInit} from '@angular/core';
import {ListItem} from "../../models/list-item.model";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @Input('itemData') itemData: ListItem | undefined; // preventing corner cases.. tslint..
  constructor() { }

  ngOnInit(): void {
  }

}
