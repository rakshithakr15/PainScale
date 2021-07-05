import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  dialNum="18001010101";

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  
  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
   systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
    }
    else{
      document.body.setAttribute('color-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('color-theme', 'dark');		
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }


  onCall() {
    this.callNumber.callNumber(this.dialNum, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
}
