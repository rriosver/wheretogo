import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  userFilters = [];

  constructor() { }
  async getUsers() {

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(environment.authUserApi.baseUrl, options);
    let users = await response.json();

    return users;
  }

  async signIn(credentials: any) {
    let users = await this.getUsers();
    this.userFilters = users.filter(
      (user: any) => 
        user.email === credentials.email &&
        user.password === btoa(credentials.password)
    );

    if (this.userFilters.length > 0) {
      return {
            error: false,
            isAuthenticated: true,
            message: '',
            data: this.userFilters[0],
      };    
    } else {
      return {
            error: false,
            isAuthenticated: false,
            message: 'Usuario y/o contraseña incorrecta',
            data: {},
      };
    }



  // authenticateUser(credentials: any) {
  //   return new Promise((resolve, reject) => {
  //     if(credentials.email !== '' && credentials.password !== '') {

  //       if(credentials.email === 'admin@admin.com' && credentials.password === '123456') {
  //         resolve({
  //           error: false,
  //           isAuthenticated: true,
  //           message: '',
  //           data: {
  //             name: 'Roxana',
  //             lastName: 'Rios',
  //           }
  //         });
  //       }
  //       else {
  //         resolve({
  //           error: false,
  //           isAuthenticated: false,
  //           message: 'Usuario y/o contraseña incorrecta',
  //           data: {}
  //         });
  //       }
  //     }
  //     else {
  //       reject({
  //         error: true,
  //         isAuthenticated: false,
  //         message: 'Ocurrio un error, por favor intente en unos minutos',
  //         data: {}
  //       });
  //     }
  //   })
  // }
  }

  async existsUserByEmail(findUser: any) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(environment.authUserApi.baseUrl, options);
    let users = await response.json();
    this.userFilters = users.filter(
      (user: any) => 
        user.email === findUser.email
    );

    if (this.userFilters.length > 0) {
      return true;
    }

    return false;
  }

  async signUp(userToRegister: any) {
    // let users = await this.getUsers();
    // let response = {};

    // this.userFilters = users.filter(
    //   (user: any) => 
    //     user.email === userToRegister.email
    // );

    // if (this.userFilters.length > 0) {
      
    // }

    
    try {

      const options = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userToRegister) 
      };

      const response = await fetch(environment.authUserApi.baseUrl, options);
      let data = await response.json();
  
      return data;

    } catch (error) {
      console.log(error);
    }
  }
}
