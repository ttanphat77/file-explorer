import { DocumentAddEditFolderDialogComponent } from './../shared/document-add-edit-folder-dialog/document-add-edit-folder-dialog.component';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
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
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  public activeNode = null;
  displayedColumns = ['select', 'name', 'weight', 'symbol', 'action'];
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
  openAddOrEditDialog() {
    // create new folder, create new sub folder, edit
    let _self = this;
    let title = 'New Sub Folder'; // name: ['New Folder', 'New Sub Folder', 'Rename']
    let type = 'edit'; // type: ['create', 'edit']
    let id = 1;
    let isSubFolder = false
    let Parent_Folder_Id = null;

    if(!id) { // id:null ->  create Folder
      if(isSubFolder) { // isSubFolder = true -> create Sub Folder
        title = "New Sub Folder";
      }
      else { // create Folder
        title = 'New Folder'
      }
    } else { // id != null -> Rename Folder
      title = 'Rename';
    }
    

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
}