import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../api.service';
import {User} from 'src/app/user';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


const CACHE_KEY = 'httpApiCache';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  apiCache: string = 'api-cache';
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

    if (localStorage.getItem('api-cache') == null) {
      this.apiService.getUsers(this.city).subscribe(
        res => {
          localStorage[CACHE_KEY] = JSON.stringify(res);
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
    }else {
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
