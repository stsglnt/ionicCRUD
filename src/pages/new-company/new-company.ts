import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { ListService } from '../../app/services/list.service'; 

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-company',
  templateUrl: 'new-company.html',
})
export class NewCompany implements OnInit{
  myForm: any;
  existCompany: any;
  existCompanyName: any;
  constructor ( public navCtrl: NavController, 
                public navParams: NavParams,
                public fb: FormBuilder,
                private listService: ListService,
                public events: Events,
) {  }

      ionViewDidLoad() {
      }

    ngOnInit() {
      this.existCompany =  this.navParams.get('item');
      if(this.existCompany){
      this.existCompanyName = this.existCompany.companyName}
      
     
        this.myForm = this.fb.group({
        title: ['', Validators.required],
        products: this.fb.array([
              ])
      })

/*run when user pressed EDIT on existed company*/

     if(this.existCompany){
        this.toFormGroup(this.existCompany)
        
      }
      
    }

/* method to fill fields with data from service */

    toFormGroup(items){
        this.myForm.patchValue({
          title: items.companyName,
         
        })
         items.companyGoods.forEach(element => {
             const control = <FormArray>this.myForm.controls['products'];
              control.push(this.fb.group({
              product: [element, Validators.required],
       
          }));
         });
  }
 
/*add new control */
    initProducts(){
         return this.fb.group({
              product: ['', Validators.required],
       
          });
    }

/*Add new field for product */
    addProduct() {
        const control = <FormArray>this.myForm.controls['products'];
        control.push(this.initProducts());
    }
/*remove field*/
    removeProduct(i: number) {
        const control = <FormArray>this.myForm.controls['products'];
        control.removeAt(i);
    }

/*Save or Submit form*/
    submitForm(myForm){

      var objectToSubmit = {
        companyName: myForm.controls.title.value,
        companyGoods: []
      }

      for (let i=0, max = myForm.controls.products.controls.length; i < max; i++ ) {
      objectToSubmit.companyGoods.push(myForm.controls.products.controls[i].controls.product.value)
      }
     

 /*PUT or PUSH methods*/  
      if(this.existCompany){
        this.listService.putCompany(objectToSubmit, this.existCompanyName)
            .subscribe(res => {
            })
      } else {
        this.listService.postCompany(objectToSubmit)
          .subscribe(res=>{
        })
      }

  
      this.navCtrl.pop()

        /*refresh page with list of companies after submit*/
        this.events.publish('refreshPage');

    }
    
}
