import { Component, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage {

  items: Item[] =[];
  newItem: Item = <Item>{}
  @ViewChild('myList')myList: IonList;

  constructor(private storageService: StorageService, private plt: Platform,
    private toastController: ToastController) {
      this.plt.ready().then(()=>{
        this.loadItems();
      });
     }

    ionViewWillEnter() {
      this.plt.ready().then(()=>{
        this.loadItems();
      });
     }

  // // CREATE
     addItem() {
      //  this.newItem.startDate = Date.now();
       this.newItem.id = Date.now();

       this.storageService.addItem(this.newItem).then(item =>{
         this.newItem = <Item>{};
         this.showToast('Record added!');
         this.loadItems(); // Or can add to array directly
       });
     }
     
     // READ
     loadItems() {
       this.storageService.getItems().then(items =>{
         this.items = items;
       });
     }

     // UPDATE
     updateItem(item: Item) {
       item.cause = `UPDATED ${item.cause}`;
      //  item.startDate = Date.now();

       this.storageService.updateItem(item).then(item =>{
         this.showToast('Record updated!');
         this.myList.closeSlidingItems();
         this.loadItems();
       });
     }

     // DELETE 
     deleteItem(item: Item) {
       this.storageService.deleteItem(item.id).then(item =>{
         this.showToast('Record removed!');
         this.myList.closeSlidingItems(); 
         this.loadItems(); // Or can slice from array
       })
     }


     //  HELPER
     async showToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
     }

}
