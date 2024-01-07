import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  if (localStorage.getItem('JWT')) {
    return true;
  }

  const router = inject(Router);

  router.navigate(['/login']);

  return false;
};
