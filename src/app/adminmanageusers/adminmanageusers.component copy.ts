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

  selectedManageUsers: any[] = [];
  dataSourceLength0?: boolean = false;
  isSelectAllUserFilters?: boolean = false;
  selectedAllUsers: any[] = [];
  isSelectedAllCurrentProjects ? : boolean = false;
  selectedAllCurrentProjects: any[] = [];
  isSelectedAllCreatedBy ? : boolean = false;
  selectedAllCreatedByArray: any[] = [];
  isSelectedAllCreatedOn ? : boolean = false;
  selectedAllCreatedOnArray: any[] = [];
  isSelectedAllLastLogin ? : boolean = false;
  selectedAllLastLoginArray: any[] = [];

  selectedCurrentProjectsArray: any[] = [];
  selectedCreatedByArray: any[] = [];
  selectedCreatedOnArray: any[] = [];
  selectedLastLoginArray: any[] = [];

  userslist !: ManageUsers[];
  isshowAdminMultiDDL?: boolean = false;

  displayedColumns: string[] = ["checkbox", "username", "currentprojects", "createdby", "createdon", "lastlogin", "admin",
    "addtoproject", "edit", "delete"];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loaduserdetail();

  }
  async isShowMultiSelectDDLList() {
    this.isshowAdminMultiDDL = true;
  }
  async isHideMultiSelectDDLList() {
    this.isshowAdminMultiDDL = false;
    this.clearDDLList();
  }

  async loaduserdetail() {

    this.dataSource = new MatTableDataSource<ManageUsers>(AdminManageUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<ManageUsers>(true, []);
    
    if (this.dataSource.filteredData.length > 0) {
      this.userdropdownData = this.dataSource.filteredData;
      
    }
    else {
      this.userdropdownData = this.dataSource;
    }
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


  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
    if (this.dataSource.filteredData.length === 0) {
      this.dataSourceLength0 = true;
    }
    else {
      this.dataSourceLength0 = false;
    }
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
    debugger;
    if (this.selectedManageUsers.length === 0 && !this.isSelectAllUserFilters) {
      this.selectedManageUsers.push(item.userid);
    }
    else if (this.selectedManageUsers.length > 0 && !this.isSelectAllUserFilters) {
      this.selectedManageUsers.forEach((element) => {
        if (!this.selectedManageUsers.includes(item.userid)) //we will push into the new array if it doesn’t exist in the array
          this.selectedManageUsers.push(item.userid);
      });
    }
    else{
      debugger;
      if(this.selectedAllUsers.length > 0 && this.isSelectAllUserFilters)
      {
        if (!this.selectedAllUsers.includes(item.userid)) 
        this.selectedAllUsers.push(item.userid);
        this.selectedManageUsers=[];
      }
    }
    console.log('onData Select User', this.selectedManageUsers);
  }

  onDataUnSelect(item: any) {

    if (this.selectedManageUsers.length > 0 && !this.isSelectAllUserFilters) {
      this.selectedManageUsers.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedManageUsers.splice(index, 1);
        }
      });
    }
    else {
      
      if (this.selectedAllUsers.length > 0 && this.isSelectAllUserFilters) {
        this.selectedAllUsers.forEach((element, index) => {

          if (element === item.userid) {

            this.selectedAllUsers.splice(index, 1);
          }
        });
      }
      else if (this.selectedAllUsers.length === 0 && this.isSelectAllUserFilters) {
        
        this.isSelectAllUserFilters = false;
        this.selectedAllUsers = [];
      }
    }

  }
  onSelectAll(items: any) {
    
    if (items.length > 0) {
      this.isSelectAllUserFilters = true;

      items.forEach((item: { userid: any; }) => {
        if (!this.selectedAllUsers.includes(item.userid)) 
          this.selectedAllUsers.push(item.userid);
          this.selectedManageUsers=[];
        
      })
    }

    console.log('onSelect All', this.selectedAllUsers);

  }
  onUnSelectAll() {
    console.log('onUnSelect All fires');
    if (this.selectedAllUsers.length > 0) {
      this.isSelectAllUserFilters = false;
      this.selectedAllUsers = [];
    }
  }

  onDataSelectCurrentprojects(item: any) {
    debugger;
    if (this.selectedCurrentProjectsArray.length === 0 && !this.isSelectedAllCurrentProjects) {
      this.selectedCurrentProjectsArray.push(item.userid);
    }
    else if (this.selectedCurrentProjectsArray.length > 0 && !this.isSelectedAllCurrentProjects) {
      this.selectedCurrentProjectsArray.forEach((element) => {
        if (!this.selectedCurrentProjectsArray.includes(item.userid))
          this.selectedCurrentProjectsArray.push(item.userid);
      });
    }
    else{
      if(this.selectedAllCurrentProjects.length > 0 && this.isSelectedAllCurrentProjects)
      {
        if (!this.selectedAllCurrentProjects.includes(item.userid)) 
        this.selectedAllCurrentProjects.push(item.userid);
        this.selectedCurrentProjectsArray=[];
      }
    }
    console.log('onData Select Current Projects', this.selectedCurrentProjectsArray);
  }
  onSelectAllCurrentprojects(items: any) {

      if (items.length > 0) {
        this.isSelectedAllCurrentProjects = true;
        items.forEach((item: { userid: any; }) => {
          if (!this.selectedAllCurrentProjects.includes(item.userid)) 
            this.selectedAllCurrentProjects.push(item.userid);
          
        })
      }
  
      console.log('SelectAllCurrentprojects', this.selectedAllCurrentProjects);
  }
  onDataUnSelectCurrentprojectst(item: any) {

    if (this.selectedCurrentProjectsArray.length > 0 && !this.isSelectedAllCurrentProjects) {
      this.selectedCurrentProjectsArray.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedCurrentProjectsArray.splice(index, 1);
        }
      });
    }
    else {
      
      if (this.selectedAllCurrentProjects.length > 0 && this.isSelectedAllCurrentProjects) {
        this.selectedAllCurrentProjects.forEach((element, index) => {

          if (element === item.userid) {

            this.selectedAllCurrentProjects.splice(index, 1);
          }
        });
      }
      else if (this.selectedAllCurrentProjects.length === 0 && this.isSelectedAllCurrentProjects) {
        
        this.isSelectedAllCurrentProjects = false;
        this.selectedAllCurrentProjects = [];
      }
    }
  }
  onUnSelectAllCurrentprojects() {
    
    if (this.selectedAllCurrentProjects.length > 0) {
      this.selectedAllCurrentProjects = [];
      this.isSelectedAllCurrentProjects = false;
    }
    console.log('onUnSelect All Currentprojects',this.selectedAllCurrentProjects);
  }

  onDataSelectCreatedBy(item: any) {
    if (this.selectedCreatedByArray.length === 0 && !this.isSelectedAllCreatedBy) {
      this.selectedCreatedByArray.push(item.userid);
    }
    else if (this.selectedCreatedByArray.length > 0 && !this.isSelectedAllCreatedBy) {
      this.selectedCreatedByArray.forEach((element) => {
        if (!this.selectedCreatedByArray.includes(item.userid))
          this.selectedCreatedByArray.push(item.userid);
      });
    }
    else{
      if(this.selectedAllCreatedByArray.length > 0 && this.isSelectedAllCreatedBy)
      {
        if (!this.selectedAllCreatedByArray.includes(item.userid)) 
        this.selectedAllCreatedByArray.push(item.userid);
        this.selectedCurrentProjectsArray=[];
      }
    }
    console.log('onData Select CreatedBy', this.selectedCreatedByArray);
  }
  onSelectAllCreatedBy(items: any) {

    if (items.length > 0) {
      this.isSelectedAllCreatedBy = true;
      items.forEach((item: { userid: any; }) => {
        if (!this.selectedAllCreatedByArray.includes(item.userid)) 
          this.selectedAllCreatedByArray.push(item.userid);
        
      })
    }

    console.log('SelectAllCreatedBy', this.selectedAllCreatedByArray);
  }
  onDataUnSelectCreatedBy(item: any) {
    debugger;
    if (this.selectedCreatedByArray.length > 0 && !this.isSelectedAllCreatedBy) {
      this.selectedCreatedByArray.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedCreatedByArray.splice(index, 1); //remove an element from an array
        }
      });
    }
    else {
      
      if (this.selectedAllCreatedByArray.length > 0 && this.isSelectedAllCreatedBy) {
        this.selectedAllCreatedByArray.forEach((element, index) => {

          if (element === item.userid) {

            this.selectedAllCreatedByArray.splice(index, 1);
          }
        });
      }
      else if (this.selectedAllCreatedByArray.length === 0 && this.isSelectedAllCreatedBy) {
        
        this.isSelectedAllCreatedBy = false;
        this.selectedAllCreatedByArray = [];
      }
    }
    console.log('UnSelect CreatedBy', this.selectedAllCreatedByArray);
  }
  onUnSelectAllCreatedBy() {
    if (this.selectedAllCreatedByArray.length > 0) {
      this.selectedAllCreatedByArray = [];
      this.isSelectedAllCreatedBy = false;
    }
    console.log('onUnSelect All CreatedBy',this.selectedAllCreatedByArray);
  }

  onDataSelectCreatedOn(item: any) {
    if (this.selectedCreatedOnArray.length === 0 && !this.isSelectedAllCreatedOn) {
      this.selectedCreatedOnArray.push(item.userid);
    }
    else if (this.selectedCreatedOnArray.length > 0 && !this.isSelectedAllCreatedOn) {
      this.selectedCreatedOnArray.forEach((element) => {
        if (!this.selectedCreatedOnArray.includes(item.userid)) 
          this.selectedCreatedOnArray.push(item.userid);
      });
    }
    else{
      if(this.selectedAllCreatedOnArray.length > 0 && this.isSelectedAllCreatedOn)
      {
        if (!this.selectedAllCreatedOnArray.includes(item.userid)) 
        this.selectedAllCreatedOnArray.push(item.userid);
        this.selectedCreatedOnArray=[];
      }
    }
    console.log('onData Select CreatedOn', this.selectedCreatedOnArray);
  }
  onSelectAllCreatedOn(items: any) {
    debugger;
    if (items.length > 0) {
      this.isSelectedAllCreatedOn = true;
      items.forEach((item: { userid: any; }) => {
        if (!this.selectedAllCreatedOnArray.includes(item.userid)) 
          this.selectedAllCreatedOnArray.push(item.userid);
        
      })
    }

    console.log('SelectAllCreatedOn', this.selectedAllCreatedOnArray);
  }
  onDataUnSelectCreatedOn(item: any) {

    if (this.selectedCreatedOnArray.length > 0 && !this.isSelectedAllCreatedOn) {
      this.selectedCreatedOnArray.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedCreatedOnArray.splice(index, 1);
        }
      });
    }
    else {
      
      if (this.selectedAllCreatedOnArray.length > 0 && this.isSelectedAllCreatedOn) {
        this.selectedAllCreatedOnArray.forEach((element, index) => {

          if (element === item.userid) {

            this.selectedAllCreatedOnArray.splice(index, 1);
          }
        });
      }
      else if (this.selectedAllCreatedOnArray.length === 0 && this.isSelectedAllCreatedOn) {
        
        this.isSelectedAllCreatedOn = false;
        this.selectedAllCreatedOnArray = [];
      }
    }
  }
  onUnSelectAllCreatedOn() {
    debugger;
    if (this.selectedAllCreatedOnArray.length > 0) {
      this.selectedAllCreatedOnArray = [];
      this.isSelectedAllCreatedOn = false;
    }
    console.log('onUnSelect All CreatedOn',this.selectedAllCreatedOnArray);
  }

  onDataSelectLastLogin(item: any) {
    debugger;
    if (this.selectedLastLoginArray.length === 0 && !this.isSelectedAllLastLogin) {
      this.selectedLastLoginArray.push(item.userid);
    }
    else if (this.selectedLastLoginArray.length > 0 && !this.isSelectedAllLastLogin) {
      this.selectedLastLoginArray.forEach((element) => {
        if (!this.selectedLastLoginArray.includes(item.userid)) 
          this.selectedLastLoginArray.push(item.userid);
      });
    }
    else{
      if(this.selectedAllLastLoginArray.length > 0 && this.isSelectedAllLastLogin)
      {
        if (!this.selectedAllLastLoginArray.includes(item.userid)) 
        this.selectedAllLastLoginArray.push(item.userid);
        this.selectedLastLoginArray=[];
      }
    }
    console.log('onData Select Last Login', this.selectedLastLoginArray);
  }
  onSelectAllLastLogin(items: any) {
    debugger;
    if (items.length > 0) {
      this.isSelectedAllLastLogin = true;
      items.forEach((item: { userid: any; }) => {
        if (!this.selectedAllLastLoginArray.includes(item.userid)) 
          this.selectedAllLastLoginArray.push(item.userid);
        
      })
    }
    console.log('SelectAllLastLogin', this.selectedAllLastLoginArray);
  }
  onDataUnSelectLastLogin(item: any) {

    if (this.selectedLastLoginArray.length > 0 && !this.isSelectedAllLastLogin) {
      this.selectedLastLoginArray.forEach((element, index) => {

        if (element === item.userid) {

          this.selectedLastLoginArray.splice(index, 1);
        }
      });
    }
    else {
      
      if (this.selectedAllLastLoginArray.length > 0 && this.isSelectedAllLastLogin) {
        this.selectedAllLastLoginArray.forEach((element, index) => {

          if (element === item.userid) {

            this.selectedAllLastLoginArray.splice(index, 1);
          }
        });
      }
      else if (this.selectedAllLastLoginArray.length === 0 && this.isSelectedAllLastLogin) {
        
        this.isSelectedAllLastLogin = false;
        this.selectedAllLastLoginArray = [];
      }
    }
  }
  onUnSelectAllLastLogin() {

    if (this.selectedAllLastLoginArray.length > 0) {
      this.selectedAllLastLoginArray = [];
      this.isSelectedAllLastLogin = false;
    }
    console.log('onUnSelect All LastLogin',this.selectedAllLastLoginArray);
  }
  async clearDDLList() {
    this.selectedManageUsers = [];
    this.selectedAllUsers=[];
    this.selectedAllCurrentProjects=[];
    this.selectedAllCreatedByArray=[];
    this.selectedAllCreatedOnArray=[];
    this.selectedAllLastLoginArray=[];
    this.isSelectAllUserFilters= false;
    this.isSelectedAllCurrentProjects=false;
    this.isSelectedAllCreatedBy=false;
    this.isSelectedAllCreatedOn=false;
    this.isSelectedAllLastLogin=false;

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
    debugger;
    this.dataSourceLength0 = false;
    if (this.selectedManageUsers.length > 0 && this.selectedCurrentProjectsArray.length === 0 
      && this.selectedCreatedByArray.length === 0 && this.selectedCreatedOnArray.length === 0
      && this.selectedLastLoginArray.length === 0 && !this.isSelectAllUserFilters) {

      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
      
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      this.selectedManageUsers.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });

      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      
      if (this.dataSource.filteredData.length > 0) {
        this.userdropdownData = filterdata;
      }
      else {
        this.userdropdownData = filterdata;
      }
    }
    else if(this.selectedManageUsers.length > 0  && this.selectedCurrentProjectsArray.length > 0
      && this.selectedCreatedByArray.length === 0 && this.selectedCreatedOnArray.length === 0
      && this.selectedLastLoginArray.length === 0 && !this.isSelectAllUserFilters)
    {
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
      
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      let filterDataSource : any[] = [];
      this.selectedCurrentProjectsArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
        
      });
      
      this.selectedManageUsers.forEach(item => {
        this.dataSource.forEach((data: { userid: any; }) =>{
          if(data.userid ===  item)
          {
            filterDataSource.push(data);
          }
        })
      });
      if(filterDataSource.length ===0)
      {
        this.dataSourceLength0 = true;
        
      }
      this.dataSource = filterDataSource;
      
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      
      if (this.dataSource.filteredData.length > 0) {
        this.userdropdownData = filterdata;
      }
      else {
        this.userdropdownData = filterdata;
      }
    }
    else if(this.selectedManageUsers.length > 0  && this.selectedCurrentProjectsArray.length > 0 && 
      this.selectedCreatedByArray.length > 0 && this.selectedCreatedOnArray.length === 0 
      && this.selectedLastLoginArray.length === 0 && !this.isSelectAllUserFilters)
    {
      
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
      
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      let filterDataSource : any[] = [];
      let createdbyfilterDataSource : any[] = [];
      this.selectedCreatedByArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            createdbyfilterDataSource.push(fd);
          }
        })
        
      });

      this.selectedCurrentProjectsArray.forEach(item => {
        createdbyfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
        
      });
      this.selectedManageUsers.forEach(item => {
        this.dataSource.forEach((data: { userid: any; }) =>{
          if(data.userid ===  item)
          {
            filterDataSource.push(data);
          }
        })

      });
      if(filterDataSource.length ===0)
      {
        this.dataSourceLength0 = true;
        
      }
      this.dataSource = filterDataSource;

      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);

      if (this.dataSource.filteredData.length > 0) {

        this.userdropdownData = filterdata;
      }
      else {
        this.userdropdownData = filterdata;
      }
    }
    else if(this.selectedManageUsers.length > 0  && this.selectedCurrentProjectsArray.length > 0 && 
      this.selectedCreatedByArray.length > 0  && this.selectedCreatedOnArray.length > 0
      && this.selectedLastLoginArray.length === 0 && !this.isSelectAllUserFilters)
    {
      
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
      
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      let filterDataSource : any[] = [];
      let createdbyfilterDataSource : any[] = [];
      let createdonfilterDataSource : any[] = [];
      this.selectedCreatedOnArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            createdonfilterDataSource.push(fd);
          }
        })
        
      });
      this.selectedCreatedByArray.forEach(item => {
        createdonfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            createdbyfilterDataSource.push(fd);
          }
        })
        
      });

      this.selectedCurrentProjectsArray.forEach(item => {
        createdbyfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
        
      });
      this.selectedManageUsers.forEach(item => {
        this.dataSource.forEach((data: { userid: any; }) =>{
          if(data.userid ===  item)
          {
            filterDataSource.push(data);
          }
        })

      });
      if(filterDataSource.length ===0)
      {
        this.dataSourceLength0 = true;
      }
      this.dataSource = filterDataSource;

      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);

      if (this.dataSource.filteredData.length > 0) {

        this.userdropdownData = filterdata;
      }
      else {
        this.userdropdownData = filterdata;
      }
    }
    else if(this.selectedManageUsers.length > 0  && this.selectedCurrentProjectsArray.length > 0 && 
      this.selectedCreatedByArray.length > 0  && this.selectedCreatedOnArray.length > 0
      && this.selectedLastLoginArray.length > 0 && !this.isSelectAllUserFilters)
    {

      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      let filterDataSource : any[] = [];
      let createdbyfilterDataSource : any[] = [];
      let createdonfilterDataSource : any[] = [];
      let lastloginfilterDataSource : any[] = [];

      this.selectedLastLoginArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            lastloginfilterDataSource.push(fd);
          }
        })
        
      });

      this.selectedCreatedOnArray.forEach(item => {
        lastloginfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            createdonfilterDataSource.push(fd);
          }
        })
        
      });
      this.selectedCreatedByArray.forEach(item => {
        createdonfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            createdbyfilterDataSource.push(fd);
          }
        })
        
      });

      this.selectedCurrentProjectsArray.forEach(item => {
        createdbyfilterDataSource.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
        
      });
      this.selectedManageUsers.forEach(item => {
        this.dataSource.forEach((data: { userid: any; }) =>{
          if(data.userid ===  item)
          {
            filterDataSource.push(data);
          }
        })
      });

      if(filterDataSource.length ===0)
      {
        this.dataSourceLength0 = true;
      }

      this.dataSource = filterDataSource;

      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);

      if (this.dataSource.filteredData.length > 0) {

        this.userdropdownData = filterdata;
      }
      else {
        this.userdropdownData = filterdata;
      }
    }

    else if (this.selectedAllUsers.length > 0 && this.selectedManageUsers.length === 0 && this.isSelectAllUserFilters) {

      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      this.selectedAllUsers.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      this.userdropdownData = filterdata;
    }
    else if (this.selectedAllCurrentProjects.length > 0  && this.selectedManageUsers.length === 0 && this.isSelectedAllCurrentProjects) {
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      this.selectedAllCurrentProjects.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });
      this.dataSourceLength0 = false;
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      this.userdropdownData = filterdata;
    }
    else if (this.selectedAllCreatedByArray.length > 0 && this.selectedManageUsers.length === 0 && this.isSelectedAllCreatedBy) {

      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      this.selectedAllCreatedByArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);

      this.userdropdownData = filterdata;
    }
    else if (this.selectedAllCreatedOnArray.length > 0 && this.selectedManageUsers.length === 0 && this.isSelectedAllCreatedOn) {
debugger;
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
      this.dataSource = [];
      this.selectedAllCreatedOnArray.forEach(item => {
        filterdata.forEach((fd: { userid: any; }) => {
          if (fd.userid === item) {
            this.dataSource.push(fd);
          }
        })
      });
      this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ManageUsers>(true, []);
      this.userdropdownData = filterdata;
    }
    else if (this.selectedAllLastLoginArray.length > 0 && this.selectedManageUsers.length === 0 && this.isSelectedAllLastLogin) {
      debugger;
      let dataSourceOriginal = new MatTableDataSource<ManageUsers>(AdminManageUsers);
 
      let filterdata = dataSourceOriginal.filteredData;
            this.dataSource = [];
            this.selectedAllLastLoginArray.forEach(item => {
              filterdata.forEach((fd: { userid: any; }) => {
                if (fd.userid === item) {
                  this.dataSource.push(fd);
                }
              })
            });
            this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.selection = new SelectionModel<ManageUsers>(true, []);
            this.userdropdownData = filterdata;
    }
    else {
      if(!this.isSelectAllUserFilters && !this.isSelectedAllCurrentProjects 
        && !this.isSelectedAllCreatedBy && !this.isSelectedAllCreatedOn && !this.isSelectedAllLastLogin)
      {
        this.dataSource = new MatTableDataSource<ManageUsers>(this.dataSource=[]);
        this.dataSourceLength0 = true;
      }

    }

  }
}
