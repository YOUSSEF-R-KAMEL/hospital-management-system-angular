import { CanActivateFn } from '@angular/router';

export const AuthGuardGuard: CanActivateFn = (route, state) => {

  const authApi = localStorage.getItem('user')

  return authApi !== 'null' ? true : false;


};


