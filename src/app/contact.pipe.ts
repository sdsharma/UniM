import { Pipe, PipeTransform } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Pipe({name: 'contact', pure: false})
export class ContactPipe implements PipeTransform {

  constructor(private angulartics2: Angulartics2) {}

  transform(value: any[], args: any): any {
    if (!value) return value;
    let vals = [];
    if(value.length > 0){
        value.forEach(val => {
          // if(val.toLowerCase().indexOf('dhruhin') > -1){
          //   this.angulartics2.eventTrack.next({ 
          //     action: 'Dhruhin Contact Found With One Searches and ' + value.length + ' other Contacts', 
          //     properties: { category: 'Search' },
          //   });
          // }
          if(val.toLowerCase().indexOf(args) > -1){
            vals.push(val);
          }
        });
    }
    return vals;
  }
}