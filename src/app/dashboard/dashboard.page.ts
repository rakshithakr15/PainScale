import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Item, StorageService } from '../services/storage.service';
import * as fieldData from '../data/fieldData.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  value: number = 7;
  defaultDate = new Date();
  bodyParts = [];
  causes = [];
  effects = [];
  symptoms = [];

  newItem: Item = <Item>{}
  constructor(private storageService: StorageService,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.bodyParts = fieldData.dashboardData.bodyParts;
    this.causes = fieldData.dashboardData.causes;
    this.effects = fieldData.dashboardData.effects;
    this.symptoms = fieldData.dashboardData.symptoms;
  }

  ionViewWillEnter() {
    this.newItem.scale = '0';
   }


  // CREATE
  addItem() {
    this.newItem.id = Date.now();
    if(this.newItem.startDate) {
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Record added!');
    });
  } else {
    this.showToast('Please add Pain Start date');
  }
  }


  //  HELPER
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position:"bottom"
    });
    toast.present();
  }
}
