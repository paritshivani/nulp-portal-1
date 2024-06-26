import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  ResourceService,
  NavigationHelperService
} from '@sunbird/shared';
import { TenantService } from '@sunbird/core';
import { TelemetryService } from '@sunbird/telemetry';
import * as _ from 'lodash-es';
import { IStartEventInput, IImpressionEventInput, IInteractEventEdata } from '@sunbird/telemetry';
import { DeviceDetectorService } from 'ngx-device-detector';
<<<<<<< HEAD
// import { ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';
import { AddusserService } from '../../../../../dashboard/services/addusser/addusser.service';

=======
import { Router, ActivatedRoute } from '@angular/router';
import { RecaptchaComponent } from 'ng-recaptcha';

export enum SignUpStage {
  BASIC_INFO = 'basic_info',
  ONBOARDING_INFO = 'onboarding_info',
  EMAIL_PASSWORD = 'email_password',
  OTP = 'otp'
}
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','./signup_form.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('captchaRef') captchaRef: RecaptchaComponent;
  public unsubscribe = new Subject<void>();
  signUpForm;
  tenantDataSubscription: Subscription;
  logo: string;
  tenantName: string;
  resourceDataSubscription: any;
  telemetryStart: IStartEventInput;
  telemetryImpression: IImpressionEventInput;
  submitInteractEdata: IInteractEventEdata;
  telemetryCdata: Array<{}>;
  instance: string;
  formInputType: string;
<<<<<<< HEAD
  isP1CaptchaEnabled: any;
  yearOfBirth: string;
  isIOSDevice: boolean = false;
  isLearnathon: boolean = false;
  showLearnathonLocationPopup = false;
  
  layoutConfiguration: any;
 languages = [{ 'value': 'en', 'label': 'English', 'dir': 'ltr', 'accessibleText': 'English' },
 {'accessibleText': 'Hindi', 'value': 'hi', 'dir': 'ltr', 'label': 'हिंदी'}];

  // =======learnathon starts======

userDetailsForm: FormGroup;
  public processedDeviceLocation: any = {};
  selectedState;
  selectedDistrict;
  allStates: any;
  allDistricts: any;
  showDistrictDivLoader = false;
  sbLocationFormBuilder: FormBuilder;
  enableSubmitBtn = false;
  isDeviceProfileUpdateAllowed = false;
  isUserProfileUpdateAllowed = false;
  public suggestionType: any;
  private suggestedLocation;
  showCategoryLoader = false;
  showCityLoader = false;
  selectedCategory:any;
  allCategories:any= [
    {
        "value": "Individual",
        "label":"Individual"
    },
    {
        "value": "Group",
        "label": "Group"
    }
]
allSubCategories:any;
allInstitutions: any;

// =======learnathon ends=======
  constructor(formBuilder: FormBuilder, public resourceService: ResourceService,
    public signupService: SignupService, public toasterService: ToasterService,
    public tenantService: TenantService, public deviceDetectorService: DeviceDetectorService,
    public activatedRoute: ActivatedRoute, public telemetryService: TelemetryService,
    public navigationhelperService: NavigationHelperService, public utilService: UtilService,
    public configService: ConfigService,  public recaptchaService: RecaptchaService,
    public tncService: TncService, public addUserService: AddusserService, public router: Router,) {
    this.sbFormBuilder = formBuilder;
=======
  isIOSDevice = false;
  signupStage: SignUpStage;
  get Stage() { return SignUpStage; }

  constructor(public resourceService: ResourceService, public tenantService: TenantService, public deviceDetectorService: DeviceDetectorService,
    public activatedRoute: ActivatedRoute, public telemetryService: TelemetryService,
    public navigationhelperService: NavigationHelperService, private router: Router) {
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe
  }

  ngOnInit() {
    this.signupStage = SignUpStage.BASIC_INFO;
    this.isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
<<<<<<< HEAD
    // this.mode = this.signUpdata.controls.contactType.value;
    this.tncService.getTncConfig().subscribe((data: ServerResponse) => {
      this.telemetryLogEvents('fetch-terms-condition', true);
        const response = _.get(data, 'result.response.value');
        if (response) {
          try {
            const tncConfig = this.utilService.parseJson(response);
            this.tncLatestVersion = _.get(tncConfig, 'latestVersion') || {};
            this.termsAndConditionLink = tncConfig[this.tncLatestVersion].url;
          } catch (e) {
            this.toasterService.error(_.get(this.resourceService, 'messages.fmsg.m0004'));
          }
        }
      }, (err) => {
      this.telemetryLogEvents('fetch-terms-condition', false);
        this.toasterService.error(_.get(this.resourceService, 'messages.fmsg.m0004'));
      }
    );
    

    const currentURL = window.location.href;
    if (currentURL.includes("learnathon")){
      this.isLearnathon = true;
    }

=======
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe
    this.instance = _.upperCase(this.resourceService.instance || 'SUNBIRD');
    this.tenantDataSubscription = this.tenantService.tenantData$.subscribe(
      data => {
        if (data && !data.err) {
          // if (this.isLearnathon){
          //   this.logo = '';
          // }
          // else {
            this.logo = data.tenantData.logo;
          // }
          
          this.tenantName = data.tenantData.titleName;
        }
      }
    );

    this.initializeFormFields();
    this.setInteractEventData();

    // Telemetry Start
    this.signUpTelemetryStart();

  }

  signUpTelemetryStart() {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo();
    this.telemetryStart = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env,
        cdata: this.telemetryCdata,
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        mode: this.activatedRoute.snapshot.data.telemetry.mode,
        uaspec: {
          agent: deviceInfo.browser,
          ver: deviceInfo.browser_version,
          system: deviceInfo.os_version,
          platform: deviceInfo.os,
          raw: deviceInfo.userAgent
        }
      }
    };
  }

  signUpTelemetryImpression() {
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env,
        cdata: this.telemetryCdata,
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.activatedRoute.snapshot.data.telemetry.uri,
        duration: this.navigationhelperService.getPageLoadTime()
      }
    };
  }

  initializeFormFields() {
<<<<<<< HEAD
    if(this.isLearnathon){
      this.signUpForm = this.sbFormBuilder.group({
        name: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        contactType: new FormControl('email'),
        uniqueContact: new FormControl(null, [Validators.required]),
        tncAccepted: new FormControl(false, [Validators.requiredTrue]),
        category: new FormControl(null,[Validators.required]),
        subcategory: new FormControl(null,[Validators.required]),
        city: new FormControl(null),
        institution: new FormControl(null)
      }, {
        validator: (formControl) => {
          const passCtrl = formControl.controls.password;
          const conPassCtrl = formControl.controls.confirmPassword;
          const nameCtrl = formControl.controls.name;
          const category = formControl.controls.category;
          const subCategory = formControl.controls.subcategory;
          // const cityCtrl = formControl.controls.city;
          // const institutionCtrl = formControl.controls.institution;
          this.onPasswordChange(passCtrl);
          if (_.trim(nameCtrl.value) === '') { nameCtrl.setErrors({ required: true }); }
          if (_.trim(passCtrl.value) === '') { passCtrl.setErrors({ required: true }); }
          if (_.trim(conPassCtrl.value) === '') { conPassCtrl.setErrors({ required: true }); }
          if (_.trim(category.value) === '') { category.setErrors({ required: true }); }
          if (_.trim(subCategory.value) === '') { subCategory.setErrors({ required: true }); }
          // if (_.trim(cityCtrl.value) === '') { cityCtrl.setErrors({ required: true }); }
          // if (_.trim(institutionCtrl.value) === '') { institutionCtrl.setErrors({ required: true }); }
          if (passCtrl.value !== conPassCtrl.value) {
            conPassCtrl.setErrors({ validatePasswordConfirmation: true });
          } else { conPassCtrl.setErrors(null); }
          return null;
        }
      });
      this.onContactTypeValueChanges();
    this.enableSignUpSubmitButton();
    }else{
      this.signUpForm = this.sbFormBuilder.group({
        name: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        contactType: new FormControl('email'),
        uniqueContact: new FormControl(null, [Validators.required]),
        tncAccepted: new FormControl(false, [Validators.requiredTrue]),
       
      }, {
        validator: (formControl) => {
          const passCtrl = formControl.controls.password;
          const conPassCtrl = formControl.controls.confirmPassword;
          const nameCtrl = formControl.controls.name;
          
          this.onPasswordChange(passCtrl);
          if (_.trim(nameCtrl.value) === '') { nameCtrl.setErrors({ required: true }); }
          if (_.trim(passCtrl.value) === '') { passCtrl.setErrors({ required: true }); }
          if (_.trim(conPassCtrl.value) === '') { conPassCtrl.setErrors({ required: true }); }
          if (passCtrl.value !== conPassCtrl.value) {
            conPassCtrl.setErrors({ validatePasswordConfirmation: true });
          } else { conPassCtrl.setErrors(null); }
          return null;
        }
      });
      this.onContactTypeValueChanges();
    this.enableSignUpSubmitButton();
    }

    // this.signUpForm = this.sbFormBuilder.group({
    //   name: new FormControl(null, [Validators.required]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   contactType: new FormControl('email'),
    //   uniqueContact: new FormControl(null, [Validators.required]),
    //   tncAccepted: new FormControl(false, [Validators.requiredTrue]),
    //   category: new FormControl(null),
    //   subcategory: new FormControl(null),
    //   city: new FormControl(null),
    //   institution: new FormControl(null)
    // }, {
    //   validator: (formControl) => {
    //     const passCtrl = formControl.controls.password;
    //     const conPassCtrl = formControl.controls.confirmPassword;
    //     const nameCtrl = formControl.controls.name;
        
    //     this.onPasswordChange(passCtrl);
    //     if (_.trim(nameCtrl.value) === '') { nameCtrl.setErrors({ required: true }); }
    //     if (_.trim(passCtrl.value) === '') { passCtrl.setErrors({ required: true }); }
    //     if (_.trim(conPassCtrl.value) === '') { conPassCtrl.setErrors({ required: true }); }
    //     if (passCtrl.value !== conPassCtrl.value) {
    //       conPassCtrl.setErrors({ validatePasswordConfirmation: true });
    //     } else { conPassCtrl.setErrors(null); }
    //     return null;
    //   }
    // });
    //       this.onContactTypeValueChanges();
    // this.enableSignUpSubmitButton();
  }

  onPasswordChange(passCtrl: FormControl): void {
    let emailVal;
    if (this.showContact === 'email') {
      emailVal = this.signUpForm?.get('email').value;
    }
    const val = _.get(passCtrl, 'value');
    const specRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~.,)(}{\\[!"#$%&\'()*+,-./:;<=>?@[^_`{|}~\\]])(?=\\S+$).{8,}');
    if (!specRegex.test(val)) {
      this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwd');
      passCtrl.setErrors({ passwordError: this.passwordError });
    } else if (emailVal === val || this.signUpForm.controls.name.value === val) {
      this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwderr');
      passCtrl.setErrors({ passwordError: this.passwordError });
    } else {
      this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwd');
      passCtrl.setErrors(null);
    }
  }

  onContactTypeValueChanges(): void {
    const emailControl = this.signUpForm.get('email');
    const phoneControl = this.signUpForm.get('phone');
    this.signUpForm.get('contactType').valueChanges.subscribe(
      (mode: string) => {
        this.setInteractEventData();
        this.signUpForm.controls['uniqueContact'].setValue('');
        if (mode === 'email') {
          this.signUpForm.controls['phone'].setValue('');
          emailControl.setValidators([Validators.required, Validators.email]);
          phoneControl.clearValidators();
        } else if (mode === 'phone') {
          this.signUpForm.controls['email'].setValue('');
          emailControl.clearValidators();
          phoneControl.setValidators([Validators.required, Validators.pattern('^\\d{10}$')]);
        }
        emailControl.updateValueAndValidity();
        phoneControl.updateValueAndValidity();
      });
  }

  enableSignUpSubmitButton() {
    this.signUpForm.valueChanges.subscribe(val => {
      if (this.signUpForm.status === 'VALID') {
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }
    });
  }

  vaidateUserContact(captchaResponse?) {
    const value = this.signUpForm.controls.contactType.value === 'phone' ?
      this.signUpForm.controls.phone.value.toString() : this.signUpForm.controls.email.value;
    const uri = this.signUpForm.controls.contactType.value.toString() + '/' + value + '?captchaResponse=' + captchaResponse;
    this.signupService.checkUserExists(uri).subscribe(
      (data: ServerResponse) => {
        if (_.get(data, 'result.exists')) {
          this.signUpForm.controls['uniqueContact'].setValue('');
          this.showUniqueError = this.signUpForm.controls.contactType.value === 'phone' ?
            this.resourceService.frmelmnts.lbl.uniquePhone : this.resourceService.frmelmnts.lbl.uniqueEmail;
        } else {
          this.signUpForm.controls['uniqueContact'].setValue(true);
          this.showUniqueError = '';
        }
      },
      (err) => {
        if (_.get(err, 'error.params.status') && err.error.params.status === 'USER_ACCOUNT_BLOCKED') {
          this.showUniqueError = this.resourceService.frmelmnts.lbl.blockedUserError;
        } else if (err.status === 418) {
          this.signUpForm.controls['uniqueContact'].setValue(true);
          this.showUniqueError = this.resourceService.frmelmnts.lbl.captchaValidationFailed;
        } else {
          this.signUpForm.controls['uniqueContact'].setValue(true);
          this.showUniqueError = '';
        }
      }
    );
  }

  displayPassword() {
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }
  /**
   * @param  {string} inputType : User input type `email` or `phone`
   * @description : Function to trigger reCaptcha for onBlur event of user input
   * @since - release-3.0.1
   */
  getReCaptchaToken(inputType: string) {
    if (this.isP1CaptchaEnabled === 'true') {
      this.resetGoogleCaptcha();
      this.formInputType = inputType;
      const emailControl = this.signUpForm.get('email');
      const phoneControl = this.signUpForm.get('phone');
      if (inputType === 'email' && emailControl.status === 'VALID' && emailControl.value !== '') {
         this.signUpForm.controls['uniqueContact'].setValue('');
        this.captchaRef.execute();
      } else if (inputType === 'phone' && phoneControl.status === 'VALID' && phoneControl.value !== '') {
         this.signUpForm.controls['uniqueContact'].setValue('');
        this.captchaRef.execute();
      }
    } else {
      this.vaidateUserContact();
    }
  }

  /**
   * @description - Intermediate function to get captcha token and submit sign up form
   * @since - release-3.0.3
   */
  submitSignupForm() {
      // @HACK - Learnathon only
      // const currentURL = window.location.href;

      if (this.isLearnathon)
      { 
        this.onSubmitLearnathonSignUp();
      }
      else
      {
        if (this.isP1CaptchaEnabled === 'true') {
            this.resetGoogleCaptcha();
            this.captchaRef.execute();
          } else {
            this.onSubmitSignUpForm();      
          }
      } 
  }

  // onSubmitLearnathonSignUpAPI(){
  //   const createRequest = {
  //     'request': {
  //       'firstName': _.trim(this.signUpForm.controls.name.value),
  //       'password': _.trim(this.signUpForm.controls.password.value),
  //       'dob': this.yearOfBirth,
  //       'channel': 'nulp-learnathon',
  //       'roles':["CONTENT_CREATOR"],
  //     }
  //   };

  //   if (this.signUpForm.controls.phone.value.toString()){
  //     createRequest.request['phone'] = this.signUpForm.controls.phone.value.toString();
  //     createRequest.request['phoneVerified'] = true;
  //   }

  //   if (this.signUpForm.controls.email.value){
  //     createRequest.request['email']  = this.signUpForm.controls.email.value;
  //     createRequest.request['emailVerified'] = true;
  //   }

  //   // this.onSubmitSignUpForm();

  //   this.addUserService.createUserDetailSaveApi(createRequest).subscribe(res => {
  //     this.telemetryLogEvents('sign-up', true);
  //     console.log('onSubmitLearnathonSignUpAPI RES', res)
  //     if (res.result.response == 'SUCCESS') {
  //       // this.redirectToSignPage();
  //     }
  //   });

  // }

  // onSubmitLearnathonSignUpNew(){
  //   const createRequest = {
  //     'request': {
  //       'firstName': _.trim(this.signUpForm.controls.name.value),
  //       'password': _.trim(this.signUpForm.controls.password.value),
  //       'dob': this.yearOfBirth,
  //       'channel': 'nulp-learnathon',
  //       'roles':["CONTENT_CREATOR"],
  //     }
  //   };

  //   if (this.signUpForm.controls.phone.value.toString()){
  //     createRequest.request['phone'] = this.signUpForm.controls.phone.value.toString();
  //     createRequest.request['phoneVerified'] = true;
  //   }

  //   if (this.signUpForm.controls.email.value){
  //     createRequest.request['email']  = this.signUpForm.controls.email.value;
  //     createRequest.request['emailVerified'] = true;
  //   }

  //   // this.onSubmitSignUpForm();

  //   this.addUserService.createUserDetailSaveNew(createRequest).subscribe(res => {
  //     this.telemetryLogEvents('sign-up', true);
  //     console.log('onSubmitLearnathonSignUpNew RES', res)
  //     // if (res.result.response == 'SUCCESS') {
  //       // this.redirectToSignPage();
  //     // }
  //   });

  // }

  onSubmitLearnathonSignUp(){
    let category =this.signUpForm.controls.category.value;
    let subCategory=this.signUpForm.controls.subcategory.value;
    let city =this.signUpForm.controls.city.value;
    let institution =this.signUpForm.controls.institution.value;


    if(this.signUpForm.controls.category.value == 'Individual'){ 
      institution =""
      if(city==null){
        this.disableSubmitBtn = true;
        this.toasterService.error(_.get(this.resourceService, 'messages.smsg.enterCity'));
      }    
    }else if(this.signUpForm.controls.category.value == 'Group'){
      city =""
      if(institution==null){
        this.disableSubmitBtn = true;
        this.toasterService.error(_.get(this.resourceService, 'messages.smsg.enterInstitutuion'));
      }
    }
    if((this.signUpForm.controls.category.value == 'Individual' && city!=null)||(this.signUpForm.controls.category.value == 'Group' && institution!=null))
    {
      const createRequest = {
        request: {
          'firstName': _.trim(this.signUpForm.controls.name.value),
          'password': _.trim(this.signUpForm.controls.password.value),
          'dob': this.yearOfBirth,
          'channel': 'nulp-learn',
          'roles':["CONTENT_CREATOR"],
          "framework": {
            "board": [
                "Data Governance and Analysis"
            ],
            "medium": [
                "Affordable Housing"
            ],
            "gradeLevel": [
                "Solutions Hackathon"
            ],
            "subject": [],
            "subcategory":[this.signUpForm.controls.subcategory.value],
            "category":[this.signUpForm.controls.category.value],
            "city":[city],
            "institution":[institution],
            "id": [
                "nulp-learn"
            ]
        }
        }
      };
  
      if (this.signUpForm.controls.phone.value.toString()){
        createRequest.request['phone'] = this.signUpForm.controls.phone.value.toString();
        createRequest.request['phoneVerified'] = true;
      }
  
      if (this.signUpForm.controls.email.value){
        createRequest.request['email']  = this.signUpForm.controls.email.value;
        createRequest.request['emailVerified'] = true;
      }

      this.addUserService.createUserV1(createRequest).subscribe(res => {
        console.log('onSubmitLearnathonSignUp RES00', res)
        this.toasterService.success(_.get(this.resourceService, 'messages.smsg.usercreationsucess'));  
        this.telemetryLogEvents('sign-up', true);
          this.redirectToSignPage();
      }, (err) => {
        this.addUserService.createUserDetailSaveNew(createRequest).subscribe(res => {
          this.telemetryLogEvents('sign-up', true);
          this.toasterService.success(_.get(this.resourceService, 'messages.smsg.usercreationsucess'));  
          console.log('onSubmitLearnathonSignUpNew RES11', res)
            this.redirectToSignPage();
        }, (err) => {
          this.toasterService.error(this.resourceService.messages.emsg.m0005);
          console.log('onSubmitLearnathonSignUp err1111', err)
        });
      });
    }
  }
  redirectToSignPage() {
    window.location.href = '/resources';
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      if (this.formInputType) {
        this.vaidateUserContact(captchaResponse);
        this.formInputType = undefined;
      } else {
        this.onSubmitSignUpForm(captchaResponse);
      }
    }
  }

  onSubmitSignUpForm(captchaResponse?) {
    this.disableSubmitBtn = true;
    this.generateOTP(captchaResponse);
  }

  generateOTP(captchaResponse?) {
    const request = {
      'request': {
        'key': this.signUpForm.controls.contactType.value === 'phone' ?
          this.signUpForm.controls.phone.value.toString() : this.signUpForm.controls.email.value,
        'type': this.signUpForm.controls.contactType.value.toString()
      }
=======
    this.signUpForm = {
      basicInfo: null,
      // onboardingInfo: null,
      emailPassInfo: null
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe
    };
  }

  subformInitialized(name: string, group: object) {
    this.signUpForm[name] = group
  }

  changeStep() {
    switch(this.signupStage) {
      case this.Stage.BASIC_INFO:
      //   this.signupStage = this.Stage.ONBOARDING_INFO;
      //   break;
      // case this.Stage.ONBOARDING_INFO:
        this.signupStage = this.Stage.EMAIL_PASSWORD;
        break;
      case this.Stage.EMAIL_PASSWORD:
        this.signupStage = this.Stage.OTP;
        break;
      default:
        this.signupStage = this.Stage.BASIC_INFO;
        break;
    }
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryCdata = [{ 'type': 'signup', 'id': this.activatedRoute.snapshot.data.telemetry.uuid }];
      this.signUpTelemetryImpression();
    });
  }

  ngOnDestroy() {
    if (this.tenantDataSubscription) {
      this.tenantDataSubscription.unsubscribe();
    }
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  setInteractEventData() {
    this.submitInteractEdata = {
      id: 'submit-signup',
      type: 'click',
      pageid: 'signup',
      extra: {
        // 'contactType': this.signUpForm.controls.contactType.value.toString()
      }
    };
  }

  redirectToLogin () {
    // this.router.navigate(['/resources/play/content']);
    // this.router.navigate(['/resources']);
    window.location.href = '/resources';
  }
<<<<<<< HEAD

  categoryChange(event){
    this.selectedCategory = event

    if(event == 'Individual'){
      this.allSubCategories= [
        {
            "value": "Municipal / Smart City Employee",
            "label": "Municipal / Smart City Employee"
        },
        {
            "value": "State Govt. Employee",
            "label": "State Govt. Employee"
        }
    ]
    }else{
      this.allSubCategories= [
        {
            "value": "ULBs",
            "label": "ULBs"
        },
        {
            "value": "Smart City SPVs",
            "label": "Smart City SPVs"
        },
        {
            "value": "State / Parastatal Body",
            "label": "State / Parastatal Body"
        }
    ]
    }

  }
  showLanguageDropdown() {
    const restrictedRoutes = ['workspace', 'manage'];
    let showLanguageChangeDropdown = true;
    for (const route of restrictedRoutes) {
      if (this.router.isActive(route, false)) {
        showLanguageChangeDropdown = false;
        break;
      }
    }
    console.log(showLanguageChangeDropdown)
    return showLanguageChangeDropdown;
  }
=======
  
>>>>>>> 7f699309db7c687d8914d2d5490d80bf0daefafe
}
