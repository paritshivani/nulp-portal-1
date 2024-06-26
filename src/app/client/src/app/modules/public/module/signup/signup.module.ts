import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent, OtpComponent, SignupBasicInfoComponent, SignupOnboardingInfoComponent, SignupEmailPasswordComponent } from './components';
import { SignupRoutingModule } from './signup-routing.module';
import { SuiModule } from 'ng2-semantic-ui-v9';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { SignupService } from './services';
import { TelemetryModule } from '@sunbird/telemetry';
import { SharedModule } from '@sunbird/shared';
<<<<<<< HEAD
import {SharedFeatureModule } from '@sunbird/shared-feature';
import { LearnathonLanguageComponent } from './../../components/learnathon-language/learnathon-language.component'

=======
import { SharedFeatureModule } from '@sunbird/shared-feature';
import { LocationModule } from '../../../../plugins/location';
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    SuiModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    TelemetryModule,
    SharedModule,
    SharedFeatureModule,
    LocationModule
  ],
<<<<<<< HEAD
  declarations: [SignupComponent, OtpComponent, LearnathonLanguageComponent],
=======
  declarations: [SignupComponent, OtpComponent, SignupBasicInfoComponent, SignupOnboardingInfoComponent, SignupEmailPasswordComponent],
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe
  providers: [SignupService]
})
export class SignupModule { }
