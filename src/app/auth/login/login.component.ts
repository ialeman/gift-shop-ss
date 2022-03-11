import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoginStatus } from '../../common/models/login-status';
import { Translation } from '../../common/models/translation.model';
import { NotificationService } from '../../core/services/notification.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { RedirectService } from '../../core/services/redirect.service';
import { LoginService } from '../services/login.service';
import { AppValidators } from '../../common/app-validators';
import { AuthService, AuthState } from '../../core/services/auth.service';
import { AuthModel } from '../../common/models/auth.model';

enum Stage {
    Login,
    Lockout,
    TwoFactor
}

function getLoginStatusMessage(status: LoginStatus): Translation {
    return { key: `auth.loginStatusDescription.${status}` };
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    public form: FormGroup;
    public submitted = false;
    public readonly Stage = Stage;
    public currentStage = Stage.Login;
    public submitting = false;
    showPassword: boolean = false;

    constructor(
        fb: FormBuilder,
        private _route: ActivatedRoute,
        private _errorHandler: ErrorHandlerService,
        private _notificationService: NotificationService,
        private _redirectService: RedirectService,
        private _loginService: LoginService,
        private _authService: AuthService,
        private _authState: AuthState
    ) {

        this.form = fb.group({
            email: ['', [Validators.required, AppValidators.email]],
            password: ['', [Validators.required]]
        });

        this._redirectService.reset();
    }

    fShowPassword() {
        var input = document.querySelector('#iPassword');

        if (!this.showPassword) {
            input.setAttribute('type', 'text');
        } else {
            input.setAttribute('type', 'password');
        }

        this.showPassword = !this.showPassword;
    }

    submit() {
        if (this.submitting) {
            return;
        }

        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        const model = this.form.value;
        console.log("Llega")
        this.submitting = true;
        this._authService.login(model).subscribe(
            (res: any) => {
                if (res.status == LoginStatus.Success) {
                    setTimeout(() => {
                        let aModel: AuthModel = {
                            id: res.user.id,
                            email: res.user.email,
                            name: res.user.userName,
                            roles: res.roles,
                            expiresIn: 0
                        };
                        
                        localStorage.setItem('amodel', btoa(JSON.stringify(aModel)));
                        this._authState.set(aModel);
                        this.navigate();
                    }, 10);
                }
            },
            err => {
                console.log({ err });
            }
        )
        // this._loginService.login(model)
        //     .subscribe((result: any) => {
        //         console.log("res:" , result );

        //         switch (result.status) {
        //             case LoginStatus.Success:
        //                 setTimeout(() => {
        //                     this.navigate();
        //                 }, 10);
        //                 break;
        //             case LoginStatus.IsLockedOut:
        //                 this.currentStage = Stage.Lockout;
        //                 break;
        //             case LoginStatus.Inactive:
        //             case LoginStatus.NotAllowed:
        //             case LoginStatus.Failed:
        //             case LoginStatus.NotConfirmed:
        //                 this._notificationService.error(getLoginStatusMessage(result.status));
        //                 break;
        //             case LoginStatus.RequiresTwoFactor:
        //                 // TODO: Process two factor authentication
        //                 this.currentStage = Stage.TwoFactor;
        //                 break;
        //             default:
        //                 this._notificationService.error({ key: 'errors.UNKNOWN' });
        //                 break;
        //         }
        //         this.submitting = false;
        //     }, error => {
        //         console.log({ error });

        //         this._errorHandler.handle(error);
        //         this.submitting = false;
        //     });
    }

    onPasswordUpdated() {
        this.navigate();
    }

    reset() {
        this.submitted = false;
        this.form.reset({});
        this.currentStage = Stage.Login;
    }

    private navigate() {
        this._redirectService.fromRoute(this._route.snapshot);
    }
}
