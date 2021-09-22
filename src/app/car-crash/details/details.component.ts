import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-car-crash-detail',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class CrashDetailComponent implements OnInit {

    crashData: any = {};
    collision_id: any;
    private paramSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private _http: HttpClient,
        private router: Router) {
    }

    ngOnInit() {
        if (this.route != undefined) {
            this.paramSubscription = this.route.params.subscribe((params: Params) => {
                if (params.collision_id) {
                    this.collision_id = params.collision_id;
                    this.getCrashDetails();
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.paramSubscription) {
            this.paramSubscription.unsubscribe();
        }
    }

    back = () => {
        this.router.navigate(['/home']);
    }

    getCrashDetails = () => {
        let success = (data: any) => {
            if (data && data.length) {
                this.crashData = data[0];
            } else {
                console.log(data);
            }
        }

        let failure = (error: any) => {
            console.log(error);
        }

        let params = {
            data: {
                collision_id: this.collision_id
            }
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
