import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}
  async canActivate() {
    const isIntroShowed = await this.storage.get('isIntroShowed');
    //const isAuthenticated = await this.storage.get('isAuthenticated');

    console.log(isIntroShowed);

    if (isIntroShowed) {
      return isIntroShowed;
    }

    this.router.navigateByUrl('menu/intro');
  }  
}
