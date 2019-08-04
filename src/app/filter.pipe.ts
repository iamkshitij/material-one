import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../app/user'

@Pipe({ 
    name:"filter"
  })
  export class FilterPipe implements PipeTransform {
    transform(arr: User[], searchValue: string) { 
      if (!searchValue) return arr;
  
      return arr.filter(value => { 
        
        return value.ifsc.toLocaleLowerCase().indexOf(searchValue.toLowerCase()) > -1 || value.branch.toLocaleLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||value.bank_name.toLocaleLowerCase().indexOf(searchValue.toLowerCase()) > -1; 
      }); 
    }
  }