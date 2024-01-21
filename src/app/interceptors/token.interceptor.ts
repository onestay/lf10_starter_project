import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  console.log(req.url);
  if (req.url.startsWith('/backend')) {
    console.log('injecting token');
    const token = userService.getAccessToken();
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(modifiedReq);
  }
  return next(req);
};
