import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ManageUsers } from '../model/ManageUsers';
import { SelectionModel } from '@angular/cdk/collections';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import AdminManageUsers from '../adminmanageusers.json';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adminmanageusers',
  templateUrl: './adminmanageusers.component.html',
  styleUrls: ['./adminmanageusers.component.scss']
})
export class AdminmanageusersComponent {

  dataSource: any;
  selection: any;
  userdropdownData: any[] = [];
  settings: IDropdownSettings = {};
  currentprojectssettings: IDropdownSettings = {};
  createdbysettings: IDropdownSettings = {};
  createdonsettings: IDropdownSettings = {};
  lastloginsettings: IDropdownSettings = {};
  selectedItems: any[] = [];
  selectedUserIDs: any[] = [];

  userslist !: ManageUsers[];
  isshowAdminMultiDDL?: boolean = false;

  displayedColumns: string[] = ["checkbox", "username", "currentprojects", "createdby", "createdon", "lastlogin", "admin",
    "addtoproject", "edit", "delete"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loaduserdetail();
    debugger;
    if (this.userdropdownData.length > 0 && this.userdropdownData.length !== null) {
      this.userdropdownData.forEach(item => {
        [
          {
            ID: item.userid, Value: item.username
          },
        ];

        this.settings = {
          idField: 'userid',
          textField: 'username',
          selectAllText: "Select All Data",
          maxHeight: 197,
          itemsShowLimit: 1,
          searchPlaceholderText: 'Search User',
          unSelectAllText: "UnSelect All Data",
          allowSearchFilter: true,
          noDataAvailablePlaceholderText: "No data available",
          
        };
        this.currentprojectssettings = {
          idField: 'userid',
          textField: 'currentprojects',
          selectAllText: "Select All Data",
          unSelectAllText: "UnSelect All Data",
          maxHeight: 197,
          itemsShowLimit: 1,
          allowSearchFilter: true,
          searchPlaceholderText: 'Search Current Projects',
          noDataAvailablePlaceholderText: "No data available"
        };
        this.createdbysettings = {
          idField: 'userid',
          textField: 'createdby',
          selectAllText: "Select All Data",
          unSelectAllText: "UnSelect All Data",
          maxHeight: 197,
          itemsShowLimit: 1,
          searchPlaceholderText: 'Search Created By',
          allowSearchFilter: true,
          noDataAvailablePlaceholderText: "No data available"
        };
        this.createdonsettings = {
          idField: 'userid',
          textField: 'createdon',
          selectAllText: "Select All Data",
          unSelectAllText: "UnSelect All Data",
          maxHeight: 197,
          itemsShowLimit: 1,
          searchPlaceholderText: 'Search Created On',
          allowSearchFilter: true,
          noDataAvailablePlaceholderText: "No data available"
        };
        this.lastloginsettings = {
          idField: 'userid',
          textField: 'lastlogin',
          selectAllText: "Select All Data",
          unSelectAllText: "UnSelect All Data",
          maxHeight: 197,
          itemsShowLimit: 1,
          searchPlaceholderText: 'Search Last Login',
          allowSearchFilter: true,
          noDataAvailablePlaceholderText: "No data available"
        };
      })
    }
    
  }
  async isShowMultiSelectDDLList() {
    this.isshowAdminMultiDDL = true;
  }
  async isHideMultiSelectDDLList() {
    this.isshowAdminMultiDDL = false;
    this.clearDLLList();
  }

  async loaduserdetail() {

    this.dataSource = new MatTableDataSource<ManageUsers>(AdminManageUsers);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<ManageUsers>(true, []);
    if (this.dataSource.filteredData.length > 0) {
      this.userdropdownData = this.dataSource.filteredData;
    }
    else {
      this.userdropdownData = this.dataSource;
    }
  }


  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  adminuserform = this.fb.group({
    userItems: [this.selectedItems],
    currentprojectsItems: [this.selectedItems],
    createdby: [this.selectedItems],
    createdon: [this.selectedItems],
    lastlogin: [this.selectedItems],

  });

  onDataSelect(item: any) {
    this.selectedUserIDs.push(item.userid);
    console.log('onData Select', item);
  }
  onDataUnSelect(item: any) {

    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedUserIDs.splice(index, 1);
        }
      });
    }
    console.log('onData UnSelect', item);
  }
  onSelectAll(items: any) {
    
    if (items.length > 0) {
      items.forEach((item: { userid: any; }) => {
        this.selectedUserIDs.push(item.userid);
      })
    }

    console.log('onSelect All', items);
    this.selectedUserIDs;
    

  }
  onUnSelectAll() {
    console.log('onUnSelect All fires');
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs = [];
    }
  }

  onDataSelectCurrentprojects(item: any) {

    this.selectedUserIDs.push(item.userid);
    console.log('onData Select', item);
  }
  onSelectAllCurrentprojects(item: any) {

    if (item.length > 0) {
      item.forEach((item: { userid: any; }) => {
        this.selectedUserIDs.push(item.userid);
      })
    }
    console.log('onData UnSelect', item);
  }
  onDataUnSelectCurrentprojectst(items: any) {
    console.log('onSelect All', items);
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs.forEach((element, index) => {

        if (element === items.userid) {

          this.selectedUserIDs.splice(index, 1);
        }
      });
    }
  }
  onUnSelectAllCurrentprojects() {
    console.log('onUnSelect All fires');
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs = [];
    }
  }

  onDataSelectCreatedBy(item: any) {
    this.selectedUserIDs.push(item.userid);
    console.log('onData Select', item);
  }
  onSelectAllCreatedBy(item: any) {
    if (item.length > 0) {
      item.forEach((item: { userid: any; }) => {
        this.selectedUserIDs.push(item.userid);
      })
    }
    console.log('onData UnSelect', item);
  }
  onDataUnSelectCreatedBy(items: any) {
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs.forEach((element, index) => {

        if (element === items.userid) {

          this.selectedUserIDs.splice(index, 1);
        }
      });
    }
    console.log('onSelect All', items);
  }
  onUnSelectAllCreatedBy() {
    console.log('onUnSelect All fires');
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs = [];
    }
  }

  onDataSelectCreatedOn(item: any) {
    this.selectedUserIDs.push(item.userid);
    console.log('onData Select', item);
  }
  onSelectAllCreatedOn(item: any) {
    if (item.length > 0) {
      item.forEach((item: { userid: any; }) => {
        this.selectedUserIDs.push(item.userid);
      })
    }
    console.log('onData UnSelect', item);
  }
  onDataUnSelectCreatedOn(items: any) {
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs.forEach((element, index) => {

        if (element === items.userid) {

          this.selectedUserIDs.splice(index, 1);
        }
      });
    }
    console.log('onSelect All', items);
  }
  onUnSelectAllCreatedOn() {
    console.log('onUnSelect All fires');
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs = [];
    }
  }

  onDataSelectLastLogin(item: any) {
    this.selectedUserIDs.push(item.userid);
    console.log('onData Select', item);
  }
  onSelectAllLastLogin(item: any) {
    if (item.length > 0) {
      item.forEach((item: { userid: any; }) => {
        this.selectedUserIDs.push(item.userid);
      })
    }
    console.log('onData UnSelect', item);
  }
  onDataUnSelectLastLogin(items: any) {
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs.forEach((element, index) => {

        if (element === items.userid) {

          this.selectedUserIDs.splice(index, 1);
        }
      });
    }
    console.log('onSelect All', items);
  }
  onUnSelectAllLastLogin() {
    
    console.log('onUnSelect All fires');
    if (this.selectedUserIDs.length > 0) {
      this.selectedUserIDs = [];
    }
  }
  async clearDLLList() {
    this.selectedUserIDs = [];
    this.ngOnInit();
    this.adminuserform = this.fb.group({
      userItems: [this.selectedItems],
      currentprojectsItems: [this.selectedItems],
      createdby: [this.selectedItems],
      createdon: [this.selectedItems],
      lastlogin: [this.selectedItems],

    });
  }
  async getSelectedList() {
    
    if (this.selectedUserIDs.length > 0) {

      let filterdata = this.dataSource.filteredData;
      this.dataSource = [];
      this.selectedUserIDs.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      if (this.dataSource.filteredData.length > 0) {
        this.userdropdownData = this.dataSource.filteredData;
      }
      else {
        this.userdropdownData = this.dataSource;
      }
    }

  }
}
