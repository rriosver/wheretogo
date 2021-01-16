import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  responseSignUp = {};
  registerForm: FormGroup;
  validationMessages = {
    firstName: [
      {type: 'required', message: 'Los nombres es requerido.'}
    ],
    lastName: [
      {type: 'required', message: 'Los apellidos es requerido.'}
    ],
    email: [
      {type: 'required', message: 'El email es requerido.'},
      {type: 'pattern', message: 'El email no es válido.'}
    ],   
    password: [
      {type: 'required', message: 'La contraseña es requerida.'},
      {type: 'minlength', message: 'La contraseña debe tener 6 caracteres como mínimo.'}
    ]
  };

  constructor(private navController: NavController, private formBuilder: FormBuilder, 
              private authenticateService: AuthenticateService,
              private alertController: AlertController) { 
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(
        '', 
        Validators.compose([
          Validators.required
        ])
      ),
      lastName: new FormControl(
        '', 
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(
        '', 
        Validators.compose([
          Validators.required, 
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],

          ),
      ),
      password: new FormControl(
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
      ]))
    });
  }

  goToLogin() {
    this.navController.navigateRoot('/login');
  }

  async registerUser(userToRegister: any) {
    console.log(userToRegister);
    try {
      if (await this.authenticateService.existsUserByEmail(userToRegister)) {
        this.alertExistsUser();
        return;
      }

      userToRegister.password = btoa(userToRegister.password);
      this.responseSignUp = await this.authenticateService.signUp(userToRegister);
      this.alertConfirm();
    } catch (error) {
      console.log(error);
    }
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      header: 'Felicidades!',
      message: 'La cuenta se registró correctamente',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateRoot('/login')
          }
        }
      ]
    });

    await alert.present();
  }

  async alertExistsUser() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Ya existe una cuenta con el correo',
      buttons: [
        {
          text: 'OK',
          // handler: () => {
          //   this.navController.navigateRoot('/Register')
          // }
        }
      ]
    });

    await alert.present();
  }

}
