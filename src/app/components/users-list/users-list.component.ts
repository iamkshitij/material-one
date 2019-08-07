import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../api.service';
import {User} from 'src/app/user';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  apiCache: string = 'api-cache';

  apiCacheMumbai: string = 'api-cache-mumbai';
  apiCacheKolkata: string = 'api-cache-kolkata';
  apiCacheChennai: string = 'api-cache-chennai';
  apiCacheDelhi: string = 'api-cache-delhi';

  listdata: MatTableDataSource<any>;
  displayedColumns: string[] = ['ifsc', 'branch', 'city', 'district', 'state', 'bank_name', 'address', 'favourite'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private apiService: ApiService) {
  }

  public users: User[];

  search = new FormControl();
  page: number;
  searchKey: string;
  city: string;
  apiURL: string = 'https://vast-shore-74260.herokuapp.com/banks?city=';
  isFavorite: boolean;
  counter: number = 0;

  ngOnInit() {


    if (localStorage.getItem('api-cache') == null) {
      this.apiService.getUsers('BANGALORE').subscribe(
        res => {

          this.users = res as User[];

          this.users.forEach(
            value => {
              if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                value._fav = true;
              }
            }
          );


          this.listdata = new MatTableDataSource(this.users);
          this.listdata.sort = this.sort;
          this.listdata.paginator = this.paginator;
          // storing data in local storage
          localStorage.setItem(this.apiCache, JSON.stringify(this.users));
        }
      );
    } else {
      this.users = JSON.parse(localStorage.getItem(this.apiCache));
      this.users.forEach(
        value => {
          if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
            value._fav = true;
          }
        }
      );
      this.listdata = new MatTableDataSource(this.users);
      this.listdata.sort = this.sort;
      this.listdata.paginator = this.paginator;
    }


    if (localStorage.getItem('Favorites') == null) {
      localStorage.setItem('Favorites', '');
    }


  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  show(event: any) {

    if (localStorage.getItem('Favorites') == null) {
      localStorage.setItem('Favorites', '');
    }
    this.city = event.target.value;

    if(this.city == "DELHI"){
      if (localStorage.getItem('api-cache-delhi') == null) {
        this.apiService.getUsers(this.city).subscribe(
          res => {

            this.users = res as User[];
            this.users.forEach(
              value => {
                if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                  value._fav = true;
                }
              }
            );

            this.listdata = new MatTableDataSource(this.users);
            this.listdata.sort = this.sort;
            this.listdata.paginator = this.paginator;
            localStorage.setItem(this.apiCacheDelhi, JSON.stringify(this.users));
          }
        );
      }
      else {
        this.users = JSON.parse(localStorage.getItem(this.apiCacheDelhi));
        this.users.forEach(
          value => {
            if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
              value._fav = true;
            }
          }
        );
        this.listdata = new MatTableDataSource(this.users);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      }
    }else if (this.city == "MUMBAI"){
      if (localStorage.getItem('api-cache-mumbai') == null) {
        this.apiService.getUsers(this.city).subscribe(
          res => {

            this.users = res as User[];
            this.users.forEach(
              value => {
                if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                  value._fav = true;
                }
              }
            );

            this.listdata = new MatTableDataSource(this.users);
            this.listdata.sort = this.sort;
            this.listdata.paginator = this.paginator;
            localStorage.setItem(this.apiCacheMumbai, JSON.stringify(this.users));
          }
        );
      }
      else {
        this.users = JSON.parse(localStorage.getItem(this.apiCacheMumbai));
        this.users.forEach(
          value => {
            if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
              value._fav = true;
            }
          }
        );
        this.listdata = new MatTableDataSource(this.users);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      }
    }else if (this.city == "KOLKATA"){
      if (localStorage.getItem('api-cache-kolkata') == null) {
        this.apiService.getUsers(this.city).subscribe(
          res => {

            this.users = res as User[];
            this.users.forEach(
              value => {
                if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                  value._fav = true;
                }
              }
            );

            this.listdata = new MatTableDataSource(this.users);
            this.listdata.sort = this.sort;
            this.listdata.paginator = this.paginator;
            localStorage.setItem(this.apiCacheKolkata, JSON.stringify(this.users));
          }
        );
      }
      else {
        this.users = JSON.parse(localStorage.getItem(this.apiCacheKolkata));
        this.users.forEach(
          value => {
            if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
              value._fav = true;
            }
          }
        );
        this.listdata = new MatTableDataSource(this.users);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      }
    }else if (this.city == "CHENNAI"){
      if (localStorage.getItem('api-cache-chennai') == null) {
        this.apiService.getUsers(this.city).subscribe(
          res => {

            this.users = res as User[];
            this.users.forEach(
              value => {
                if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                  value._fav = true;
                }
              }
            );

            this.listdata = new MatTableDataSource(this.users);
            this.listdata.sort = this.sort;
            this.listdata.paginator = this.paginator;
            localStorage.setItem(this.apiCacheChennai, JSON.stringify(this.users));
          }
        );
      }
      else {
        this.users = JSON.parse(localStorage.getItem(this.apiCacheChennai));
        this.users.forEach(
          value => {
            if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
              value._fav = true;
            }
          }
        );
        this.listdata = new MatTableDataSource(this.users);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      }
    }else{
      if (localStorage.getItem('api-cache') == null) {
        this.apiService.getUsers(this.city).subscribe(
          res => {

            this.users = res as User[];
            this.users.forEach(
              value => {
                if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
                  value._fav = true;
                }
              }
            );

            this.listdata = new MatTableDataSource(this.users);
            this.listdata.sort = this.sort;
            this.listdata.paginator = this.paginator;
            localStorage.setItem(this.apiCache, JSON.stringify(this.users));
          }
        );
      } else {
        this.users = JSON.parse(localStorage.getItem(this.apiCache));
        this.users.forEach(
          value => {
            if (localStorage.getItem('Favorites').indexOf(value.ifsc) > -1) {
              value._fav = true;
            }
          }
        );
        this.listdata = new MatTableDataSource(this.users);
        this.listdata.sort = this.sort;
        this.listdata.paginator = this.paginator;
      }

    }



  }

  applyFilter() {
    this.listdata.filter = this.searchKey.trim().toLowerCase();
  }

  onFav(id: any) {

    let temp = localStorage.getItem('Favorites');
    this.users.forEach(
      value => {
        if (value.ifsc == id) {
          value._fav = !value._fav;
          if (value._fav) {
            temp = temp + ',' + value.ifsc;
          } else {
            temp = temp.replace(value.ifsc, '');
          }

        }
      }
    );
    //console.log(temp);
    localStorage.setItem('Favorites', temp);
  }

}
