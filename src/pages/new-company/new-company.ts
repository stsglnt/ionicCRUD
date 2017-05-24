import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { ListService } from '../../app/services/list.service'; 


@IonicPage()
@Component({
  selector: 'page-new-company',
  templateUrl: 'new-company.html',
})
export class NewCompany implements OnInit{
  myForm: any;

  constructor ( public navCtrl: NavController, 
                public navParams: NavParams,
                public fb: FormBuilder,
                private listService: ListService,
) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCompany');

 
  }

  ngOnInit() {
      this.myForm = this.fb.group({
      title: ['', Validators.required],
      products: this.fb.array([
                this.initProducts()
            ])
    })
    console.log(this.myForm.controls);
  }
  
    initProducts(){
         return this.fb.group({
              product: ['', Validators.required],
       
          });
    }
    /*Add new field for product */
    addProduct() {
        // add address to the list
        const control = <FormArray>this.myForm.controls['products'];
        control.push(this.initProducts());
    }
    /*remove field*/
    removeProduct(i: number) {
        // remove address from the list
        const control = <FormArray>this.myForm.controls['products'];
        control.removeAt(i);
    }
    
    submitForm(myForm){

      var objectToSubmit = {
        companyName: myForm.controls.title.value,
        companyGoods: []
      }

      for (let i=0, max = myForm.controls.products.controls.length; i < max; i++ ) {
      objectToSubmit.companyGoods.push(myForm.controls.products.controls[i].controls.product.value)
      }
      console.log(myForm)
      console.log(objectToSubmit);

      this.listService.postCompany(objectToSubmit)
        .subscribe(res=>{
          console.log(res);
        })

    }
    
}
