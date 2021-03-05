import { DocumentAddEditFolderDialogComponent } from './../shared/document-add-edit-folder-dialog/document-add-edit-folder-dialog.component';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatSortable, MatTableDataSource, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { DataSourceService } from '../service/data-source.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Fruit loops' },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli' },
          { name: 'Brussel sprouts' },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins' },
          { name: 'Carrots' },
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  modified: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, modified: new Date()},
  { position: 2, name: 'Helium', weight: 4.0026, modified: new Date('2020-10-30T15:27:08')},
  { position: 3, name: 'Lithium', weight: 6.941, modified: new Date('1996-10-30T15:27:08') },
  { position: 4, name: 'Beryllium', weight: 9.0122, modified:new Date('1996-10-30T15:27:08') },
  { position: 5, name: 'Boron', weight: 10.811, modified: new Date('2021-10-30T15:27:08') },
  { position: 6, name: 'Carbon', weight: 12.0107, modified: new Date('2004-10-05T15:27:08') },
  { position: 7, name: 'Nitrogen', weight: 14.0067, modified: new Date('1996-10-30T15:27:08') },
  { position: 8, name: 'Oxygen', weight: 15.9994, modified: new Date('1994-10-30T15:27:08') },
  { position: 9, name: 'Fluorine', weight: 18.9984, modified: new Date('2015-10-30T15:27:08') },
  { position: 10, name: 'Neon', weight: 20.1797, modified: new Date('2013-10-30T15:27:08') },
];

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  public activeNode = null;
  mainColumns = ['select', 'name' ,'weight', 'modified', 'action'];
  actionColumns = ['select', 'delete'];
  displayedColumns = this.mainColumns;
  tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  constructor(
    private dataSourceService: DataSourceService,
    private dialog: MatDialog
    ) {
    this.dataSource.data = TREE_DATA;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.tableDataSource.sort = this.sort;
    }, 1000);
  }

  ngOnInit() {
    
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  changeHeader() {
    this.displayedColumns = this.selection.selected.length > 0 ? this.actionColumns : this.mainColumns;
    }


  //selection
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  // Dilog
  openAddOrEditDialog(type, isSubFolder, title) {
    // create new folder, create new sub folder, edit
    let _self = this;
    // let title = 'New Sub Folder'; // name: ['New Folder', 'New Sub Folder', 'Rename']
    // let type = 'edit'; // type: ['create', 'edit']
    let id = 1;
    // let isSubFolder = false
    let Parent_Folder_Id = null;

    // if(!id) { // id:null ->  create Folder
    //   if(isSubFolder) { // isSubFolder = true -> create Sub Folder
    //     title = "New Sub Folder";
    //   }
    //   else { // create Folder
    //     title = 'New Folder'
    //   }
    // } else { // id != null -> Rename Folder
    //   title = 'Rename';
    // }
    

    let data = {
      id: id,
      name: '',
      isSubFolder: isSubFolder,
      Parent_Folder_Id: Parent_Folder_Id
    }

    const dialogRef = this.dialog.open(DocumentAddEditFolderDialogComponent, {
      width: '460px',
      maxHeight: '477px',
      panelClass: 'document-new-folder-dialog',
      data: {
        title: title,
        type: type,
        id: id,
        isSubFolder: isSubFolder,
        onCreate: (name) => {
          data.name = name;
          console.log(data)
          
          // this.commonService.onShowWarningDialog(
          //   'Name is already exist',
          //   'There is already a file with the same name. Please use a different name.',
          //   () => {
          //   });
          // this.documentService.createNewFolderDocument(data).subscribe(
          //   (rs) => {
          //     console.log(rs);
          //     dialogRef.close();
          //   },
          //   (err) => {
          //     console.log(err)
          //   }
          // )
        },
        onUpdate: (name) => {
          data.name = name;
          console.log(data)
          // this.documentService.updateFolderNameDocument(data).subscribe(
          //   (rs) => {
          //     console.log(rs);
          //     dialogRef.close();
          //   },
          //   (err) => {
          //     console.log(err)
          //   }
          // )
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result)
      }
    });
  }

  @ViewChild(MatSort) matSort: MatSort;
  foods = [
    {value: 'desc-date', viewValue: 'Newest to Oldest'},
    {value: 'asc-date', viewValue: 'Oldest to Newest'},
    {value: 'asc-alpha', viewValue: 'A to Z'},
    {value: 'desc-alpha', viewValue: 'Z to A'}
  ];
  selectedFood = this.foods[2].value
  selectCar(event) {
    this.selectedFood = event.value;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if(this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  orderData(id: string, start?: 'asc' | 'desc') {
    const matSort = this.tableDataSource.sort;
    const toState = 'active';
    const disableClear = false;

    matSort.sort({ id: null, start, disableClear });
    matSort.sort({ id, start, disableClear });

    this.tableDataSource.sort = this.matSort;
  }

  // sortDataSource(id: string, start?: 'asc' | 'desc') {
  //   let descLastModified = 0;
  //   let ascLastModified = 0;
  //   if(start === 'desc') {
  //     descLastModified = -1;
  //     ascLastModified = 1;
  //   } else {
  //     descLastModified = 1;
  //     ascLastModified = -1;
  //   }
  //   this.tableDataSource.sort.sort(<MatSortable>({ id: id, start: start }));
  //   this.tableDataSource.data.sort((a: any, b: any) => {
  //       if (a.lastModified < b.lastModified) {
  //           return descLastModified;
  //       } else if (a.lastModified > b.lastModified) {
  //           return ascLastModified;
  //       } else {
  //           return 0;
  //       }
  //   });
  // }

  selectSort(event) {
    console.log(event);
    if(event.value == 'asc-alpha') {
      this.orderData('name', 'asc');
    } else if(event.value == 'desc-alpha') {
      this.orderData('name', 'desc');
    } else if(event.value == 'desc-date') {
      this.orderData('modified', 'desc');
    } else {
      this.orderData('modified', 'asc');
    }
  }
}