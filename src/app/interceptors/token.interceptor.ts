import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  if (req.url.startsWith('/backend')) {
    const token = userService.getAccessToken();
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(modifiedReq);
  }
  return next(req);
};
