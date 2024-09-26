import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hospital-management';

  isUserLogged:boolean = false

  constructor(private authApi:AuthService){
    this.isUserLogged = this.authApi.isUserLogged()
  }
}
