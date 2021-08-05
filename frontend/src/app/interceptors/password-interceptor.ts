import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class PasswordInterceptor implements HttpInterceptor{

    constructor(private injector: Injector){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
        let authService = this.injector.get(AuthService)
        let tokenizedReq = req.clone({
            setHeaders: {
                reset: `${authService.getTokenReset()}`
            },
        });
        return next.handle(tokenizedReq)
    }
}