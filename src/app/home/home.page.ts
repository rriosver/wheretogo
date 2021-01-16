import { Component } from '@angular/core';
import { OpentripmapService } from '../services/opentripmap.service';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ModalplacePage } from '../modalplace/modalplace.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contentPlacesLoaded = false;
  errorMessage = '';
  placesFound: any[];
  cityFound: any = {};
  countPlacesFound: number = 0;
  constructor(private openTripMapService: OpentripmapService, private mondalController: ModalController) {
    this.viewSkeleton();
  }

  viewSkeleton() {
    setTimeout(() => {
      this.contentPlacesLoaded = true;
    }, 3000);
  }
  

  async ionViewDidEnter() {
    // try {
    //   this.cityFound = await this.openTripMapService.getCityFromSearch(environment.openTripMap.defaultCity);
    //   if (this.cityFound) {
    //     this.placesFound = await this.openTripMapService.getPlacesByLatLon(
    //       environment.openTripMap.radius,
    //       this.cityFound.lon,
    //       this.cityFound.lat,
    //       environment.openTripMap.rate,
    //       environment.openTripMap.formatJson
    //     );
    //     console.log(this.placesFound);
    //   }
    // } catch(error) {
    //   console.log(error);
    // }
  }

  async getPlacesXCity(textSearch: any) {
    this.placesFound = [];
    this.contentPlacesLoaded = false;
    this.errorMessage = '';
    try {
      const val = textSearch.target.value;
      if (!(val && val.trim() !== '')) {
        return;
      }
      if (val.length < 3) {
        this.errorMessage = 'Mínimo 3 caracteres.';
        return;
      }
      this.cityFound = await this.openTripMapService.getCityFromSearch(val);
      if (this.cityFound) {
        this.placesFound = await this.openTripMapService.getPlacesByLatLon(
          environment.openTripMap.radius,
          this.cityFound.lon,
          this.cityFound.lat,
          environment.openTripMap.rate,
          environment.openTripMap.formatJson
        );
        console.log(this.cityFound);
        this.viewSkeleton();
      }
    } catch(error) {
      console.log(error);
    }
  }

  async showDetailPlace(place: any) {
    const placeSelected = await this.openTripMapService.getDetailPlaceByXid(place.xid);
    //console.log(placeSelected);
    const modal = await this.mondalController.create({
      component: ModalplacePage,
      componentProps: {
        placeSelected: placeSelected,
      }
    });
    //console.log(modal);

    return await modal.present();
  }
}
