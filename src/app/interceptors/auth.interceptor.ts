import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Verifique se a requisição deve ser ignorada pelo interceptor
  const skipInterceptor = req.headers.has('Skip-Interceptor');

  if (token && !skipInterceptor) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token, //`Bearer ${token}`
      },
    });
    return next(clonedRequest);
  }

  // Remove o cabeçalho antes de enviar a requisição
  const cleanedRequest = req.clone({
    headers: req.headers.delete('Skip-Interceptor'),
  });

  return next(cleanedRequest);
};
