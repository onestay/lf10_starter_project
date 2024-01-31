import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../user.service';
import { from, switchMap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  if (req.url.startsWith('/backend')) {
    console.log('injecting token');
    return from(userService.getAccessToken()).pipe(
      switchMap((token) => {
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next(modifiedReq);
      }),
    );
  } else {
    return next(req);
  }
};
