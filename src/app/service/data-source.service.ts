import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  DATA = [
    { name: 'Fruit', Id: 1, parentId: null },
    { name: 'Apple', Id: 2, parentId: 1 },
    { name: 'Banana', Id: 3, parentId: 1 },
    { name: 'Fruit loops', Id: 4, parentId: 1 },
    { name: 'Vegetables', Id: 5, parentId: null },
    { name: 'Green', Id: 6, parentId: 5 },
    { name: 'Broccoli', Id: 7, parentId: 6 },
    { name: 'Brussels sprouts', Id: 8, parentId: 6 },
    { name: 'Orange', Id: 9, parentId: 5 },
    { name: 'Pumpkins', Id: 10, parentId: 9 },
    { name: 'Carrots', Id: 11, parentId: 9 },
    { name: 'India', Id: 12, parentId: null },
    { name: 'Maharashtra', Id: 13, parentId: 12 },
    { name: 'Mumbai', Id: 14, parentId: 13 },
    { name: 'Karnataka', Id: 15, parentId: 12 },
    { name: 'Bangalore', Id: 16, parentId: 15 },]

  constructor() { }

  getFolders(parentId = null) {
    return this.DATA.filter(f => f.parentId == parentId);
  }
}
