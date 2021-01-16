import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage  {
  user : any;
  photo: SafeResourceUrl;
  urlAvatarDefaultImage = environment.urlAvatarDefaultImage;
  constructor(private sanitizer: DomSanitizer, private storage: Storage) {
    this.getDataUser();
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    if (image) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);

    }
    console.log(image);
  }

  async getDataUser() {
    const dataUser = await this.storage.get('userAutheticated');
    if (dataUser) {
      this.user = dataUser;
    } else {
      this.user = {};
    }
    console.log(this.user);
    //return this.user;
  }
}
