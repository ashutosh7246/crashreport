import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'toDate' })
export class ToDate implements PipeTransform {
    constructor() { }
    transform(timestamp: any) {
        let date: any = '';
        try {
            date = moment(timestamp).format('YYYY-MM-DD');
        } catch (e) {
        }
        return date;
    }
}
