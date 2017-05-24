import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ListService {
    http: any;
    baseUrl: String;

    constructor (http: Http){
        this.http = http;
        this.baseUrl = 'http://avalon.avalonfaltd.com:3090/companies';
        
    }

    getCompanies() {
       return  this.http.get(this.baseUrl)
                    .map(res => res.json());

    }
    deleteCompany(companyName){
     
       return this.http.delete(this.baseUrl + '/' + companyName)
            .map(res => res.json());
        
    }

    postCompany(body){
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

        return this.http.post(this.baseUrl, bodyString, options) 
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         
    }

    putCompany(body, companyName) {
        let bodyString = JSON.stringify(body); 
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({ headers: headers }); 

        return this.http.put(this.baseUrl + "/" + companyName, bodyString, options) 
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data

    }

}