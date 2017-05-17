import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'search'
})
export class Search implements PipeTransform {
    transform(items: any, filter: any, companysearch: boolean): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
        console.log('this is companysearch variable', companysearch)
        
        if(companysearch){
        console.log('this is items', items);
        console.log('this is filter', filter);
        console.log('this is filterKeys', filterKeys);
          
      return items.filter(item =>
             new RegExp(filter[filterKeys[0]], 'gi').test(item[filterKeys[0]])) || filter[filterKeys[0]] === "";

                  
      } else { 
          console.log('this is items', items);
        console.log('this is filter', filter);
        console.log('this is filterKeys', filterKeys);
      console.log('companysearch set to false');
         return items.filter(item =>
              
                new RegExp(filter[filterKeys[1]], 'gi').test(item[filterKeys[1]])) || filter[filterKeys[1]] === "";
      }
    } else {
          return items;
          
    }
}
}
/*import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {


  private filterByString(filter) {
    filter = filter.toLowerCase();
    return value => {
      return !filter || value.toLowerCase().indexOf(filter) !== -1;
    }
  }

  private filterByObject(filter) {
    return value => {
      for (let key in filter) {
        if (!value.hasOwnProperty(key)) {
          return false;
        }

        const type = typeof value[key];
        let isMatching;

        if (type === 'string') {
          isMatching = this.filterByString(filter[key])(value[key]);
        } else if (type === 'object') {
          isMatching = this.filterByObject(filter[key])(value[key]);
        } else {
          isMatching = this.filterDefault(filter[key])(value[key]);
        }

        if (!isMatching) {
          return false;
        }
      }

      return true;
    }
  }

  /**
   * Defatul filterDefault function
   *
   * @param filter
   * @returns {(value:any)=>boolean}
   */
 /* private filterDefault(filter) {
    return value => {
      return !filter || filter == value;
    }
  }

  private isNumber(value) {
    return !isNaN(parseInt(value, 10)) && isFinite(value);
  }

  transform(array: any[], filter: any): any {
    const type = typeof filter;

    if (type === 'string') {
      if (this.isNumber(filter)) {
        return array.filter(this.filterDefault(filter));
      }

      return array.filter(this.filterByString(filter));
    }

    if (type === 'object') {
      return array.filter(this.filterByObject(filter));
    }

    return array.filter(this.filterDefault(filter));
  }
}*/