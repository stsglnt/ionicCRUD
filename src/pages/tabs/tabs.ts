import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NewCompany } from '../new-company/new-company';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewCompany;
  tab3Root = ContactPage;

  constructor() {

  }
  
}
