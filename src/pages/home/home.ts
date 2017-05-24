import { OnInit } from '@angular/core/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http} from '@angular/http';
import { FormControl } from '@angular/forms';
import { ListService } from '../../app/services/list.service'; 
import 'rxjs/add/operator/debounceTime';
import { LoadingController } from 'ionic-angular'

import { NewCompany } from '../new-company/new-company'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{
  listFromAPI: any;
  companies: any;
  showDetails: boolean = false;
  icon: string;
  filterText: any;
  goodsOrCompanies: String;
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
   public filterInput = new FormControl();
  constructor(public navCtrl: NavController,
              private listService: ListService,
              private http: Http,
              public loadingCtrl: LoadingController 
  ) {
  }
  ionViewDidLoad() {
     this.getList();
  }
  
  ngOnInit(){
    this.loading.present();
    this.filterText = "";
     this.filterInput
      .valueChanges
      .debounceTime(500)
      .subscribe(term => {
        this.filterText = term;
        console.log(term);
      });
      this.goodsOrCompanies = 'true';
  }
  getList(){
    this.listService.getCompanies()
      .subscribe(res => {
        this.listFromAPI = res.success;
        this.initializeItems();
        this.loading.dismiss();
      })
      
  }
  initializeItems() {
    this.companies = this.listFromAPI;
  }



  getItems(ev) {
    // Reset items back to all of the items

    // set val to the value of the ev target
    var val = ev.target.value;
 console.log(val);
    // if the value is an empty string don't filter the items
    /*if (val && val.trim() != '') {
      this.companies = this.companies.filter((item, index, array) => {
        let result = array[index+1].companyName.toLowerCase().indexOf(val.toLowerCase())  > -1
        console.log(result);
        
        return (array[index+1].companyName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        
      })
    console.log(this.companies);
      
    }*/
  }
  deleteCompany(companyName){
    console.log(companyName);
      this.listService.deleteCompany(companyName)
          .subscribe(data => {
            console.log(data)
          })
  this.getList()
          
  }
 /*Opens company products */
     toggleDetails(event, i) {
       /*console.log('from outside');
  event.stopPropagation();*/
    if (this.showDetails === i) {
        this.showDetails = false;
       /* this.icon = 'ios-add-circle-outline';*/
    } else {
        this.showDetails = i;
       /* this.icon = 'ios-remove-circle-outline';*/
    }
  }
/*  stopPropagation(event){
    console.log('from inside')
    event.stopImmediatePropagation();
  }*/

  addNewCompany(){
    this.navCtrl.push(NewCompany)
  }  

  editCompany(item){
    console.log(item);
  }


}
