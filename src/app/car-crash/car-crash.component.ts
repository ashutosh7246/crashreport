import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'app-car-crash',
    templateUrl: './car-crash.component.html',
    styleUrls: ['./car-crash.component.scss']
})
export class CrashComponent implements OnInit {
    crashdata: any = [];
    offset: any = 0;
    limit: any = 5;

    crashdate: NgbDateStruct;
    date: any;

    constructor(
        private _http: HttpClient,
        private router: Router) {
    }

    ngOnInit() {
        this.getCrashDetails();
    }

    getbydate = () => {
        // console.log(this.crashdate);
        // this.date = new Date(this.crashdate.year, this.crashdate.month, this.crashdate.day).toISOString();
        // this.getCrashDetails();

    }

    details = (index: any) => {
        let collision_id = this.crashdata[index]['collision_id'];
        this.router.navigate(['/details', { collision_id: collision_id }]);
    }

    previous = () => {
        if (this.offset > 0) {
            this.offset = this.offset - 5;
            this.getCrashDetails();
        }
    }

    next = () => {
        if (this.offset < 1000) {
            this.offset = this.offset + 5;
            this.getCrashDetails();
        }
    }

    getCrashDetails = () => {
        let success = (data: any) => {
            if (data && data.length) {
                this.crashdata = data;
            } else {
                console.log(data);
            }
        }

        let failure = (error: any) => {
            console.log(error);
        }

        let params: any = {
            data: {
                $offset: this.offset,
                $limit: this.limit
            }
        }
        if (this.date) {
            params.data['crash_date'] = this.date;
        }

        let opts = this._prepareHTTPOptions(params);
        this._http.get('https://data.cityofnewyork.us/resource/h9gi-nx95.json', opts).subscribe((data: any) => success(data), (err: any) => failure(err));
    }

    private _prepareHTTPOptions(options: any) {
        const { data, requestOptions } = options;
        let params = new HttpParams();
        for (let key in data) {
            if (data.hasOwnProperty(key) && (data[key] || data[key] === 0)) {
                if (typeof data[key] === 'object') {
                    params = params.set(key, JSON.stringify(data[key]));
                } else {
                    params = params.set(key, data[key]);
                }
            }
        }
        let opts = {
            params
        };
        if (requestOptions) {
            opts = Object.assign({}, opts, requestOptions);
        }
        return opts;
    }
}
