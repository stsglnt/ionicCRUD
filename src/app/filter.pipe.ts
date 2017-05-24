import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'search'
})
export class Search implements PipeTransform {
    transform(items: any, filter: any, companysearch: boolean): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
        
        if(companysearch){
          
      return items.filter(item =>
             new RegExp(filter[filterKeys[0]], 'gi').test(item[filterKeys[0]])) || filter[filterKeys[0]] === "";

                  
      } else { 
         return items.filter(item =>
              
                new RegExp(filter[filterKeys[1]], 'gi').test(item[filterKeys[1]])) || filter[filterKeys[1]] === "";
      }
    } else {
          return items;
          
    }
}
}
