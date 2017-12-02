import { Pipe, PipeTransform } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

@Pipe({name: 'event', pure: false})
export class EventPipe implements PipeTransform {

  constructor(private angulartics2: Angulartics2) {}

  transform(value: any[], args: any): any {
    if (!value) return value;
    let vals = [];
    if(value.length > 0){
        value.forEach(val => {
          // if(val.message.indexOf('idea') > -1){
          //   this.angulartics2.eventTrack.next({ 
          //     action: 'Idea Message Found With One Searches and ' + value.length + ' other messages', 
          //     properties: { category: 'Search' },
          //   });
          // }
          if(val.message.toLowerCase().indexOf(args.message.toLowerCase()) > -1){
            vals.push(val);
          }
        });
    }
    return vals;
  }
}