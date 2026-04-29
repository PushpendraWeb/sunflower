import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorModel } from './error-model';
import { Constants } from './constants';
import { Login } from './login.model';
import { APIConstants } from './apiconstants';
import { AuthModel } from './auth-model';
import { ToastService } from './toast.service';
declare var $: any;

export interface ICustomerWindow extends Window {
  __customer_global_stuff: string;
}

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  get netiveWindow(): ICustomerWindow {
    return getWindow();
  }

  // public serverUrl: string = 'http://localhost:2000';
  public serverUrl: string = 'https://sunflowerapi.vercel.app';
  public setmenu: boolean = false;
  public epmplytype: boolean = false;
  public inventorytype: boolean = false;
  public IsUserLoggedIn: boolean = false;
  public header: boolean = false;
  public UserProfile: any = [];
  public loading: boolean = false;
  public images: string = '';
  public sulg: any;
  public proimag: any = [];
  public control: any = [];
  public img_url: any = [];
  public roles: any = [];
  public type: any = [];
  public freeplan: boolean = false;
  public salg: any = [];
  public Invoiceview: boolean = false;
  public invoicelength: any = 0;
  public invoiceId: any = 0;
  public baseurl: string = this.serverUrl + '/api';
  // public baseurl: string = 'http://13.232.253.51:2000/api'
  // public baseurl: string = 'https://vasavi-group.shop/api';
  public image_url: string = 'https://vasavibk.s3.dualstack.eu-north-1.amazonaws.com/';
  public image_local: string = 'user-image.jpg';
  public meetingUrl: string = 'https://vasavi-group.shop';
  public pdf_url: string = 'https://vasavibk.s3.dualstack.eu-north-1.amazonaws.com/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {
    // this.img_url = ezeedairy.s3.ap - south - 1.amazonaws.com
    // this.img_url = 'http://ezeedairy.s3.ap-south-1.amazonaws.com'
  }

  public Get(routePath: string) {
    return this.http.get<any>(this.baseurl + routePath, this.getHeader());

  }

  public GetImage(routePath: string) {
    return this.http.get<any>(this.baseurl + routePath, this.getHeader());

  }

  public Post(routePath: string, data: any) {
    return this.http.post<any>(this.baseurl + routePath, data, this.getHeader())
  }

  public GetAuth(routePath: string) {
    return this.http.get<any>(this.baseurl + routePath, this.getHeader(true));
  }

  public PostAuth(routePath: string, data: any) {
    return this.http.post<any>(this.baseurl + routePath, data, this.getHeader(true))
  }

  public PutAuth(routePath: string, data: any) {
    return this.http.put<any>(this.baseurl + routePath, data, this.getHeader(true))
  }

  public PatchAuth(routePath: string, data: any) {
    return this.http.patch<any>(this.baseurl + routePath, data, this.getHeader(true))
  }

  public Delete(routePath: string) {
    return this.http.delete<any>(this.baseurl + routePath, this.getHeader(true))
  }

  public GetAuthBlob(routePath: string) {
    const token = this.GetAuthToken();
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/pdf'
    });
    return this.http.get(this.baseurl + routePath, {
      headers: reqHeader,
      responseType: 'blob',
      observe: 'response'
    });
  }

  Postimg(API: string, body: any) {
    const formData: FormData = new FormData();
    var file = body[0];
    formData.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        //"Authorization": 'Bearer ' + this.GetAuthToken(),
        'Content-Type': 'application/json'

      })
    };

    return this.http.post(this.baseurl + '/' + API, formData)
  }

  public Login(lModel: Login) {
    var data = { "email": lModel.email, "mobile": lModel.mobile, "password": lModel.password, "type": lModel.type }
    var loginHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseurl + APIConstants.Login, data, { headers: loginHeader });
  }

  public LoginWithMobilePassword(mobile: number, password: string) {
    const data = { mobile, password };
    const loginHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseurl + '/users/login', data, { headers: loginHeader });
  }

  public ResetPassword(mobile: number, new_password: string, options?: { reset_token?: string; old_password?: string }) {
    const data: any = { mobile, new_password };
    if (options?.reset_token) data.reset_token = options.reset_token;
    if (options?.old_password) data.old_password = options.old_password;
    const loginHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseurl + '/users/resetpassword', data, { headers: loginHeader });
  }

  public Logout() {
    this.IsUserLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public GetAuthToken() {
    const currentUser = this.GetLoggedInUser();
    if (currentUser != null) {
      this.sulg = currentUser;
      const authData = currentUser as AuthModel & { token?: string };
      return authData.access_token || authData.AccessToken || authData.token || null;
    }
    else {
      return null;
    }
  }

  public GetLoggedInUser() {

    this.IsUserLoggedIn = false;
    var currentUser: AuthModel = JSON.parse(localStorage.getItem(Constants.AuthData) || '{}');
    // 
    if (currentUser !== null && Object.keys(currentUser).length > 0) {
      this.IsUserLoggedIn = true;
      return currentUser;
    }
    else {
      if (!this.IsUserLoggedIn) {
        this.Logout();
      }

      return null;
    }
  }

  public Error(err: any): ErrorModel | void {
    if (err.status == 0) {
      console.clear();
      this.toastService.showError('Network Error', 'Unable to connect to server. Please check your internet connection.');
      this.router.navigate(['network-issue']);
      return;
    }
    else if (err.status == 500) {
      console.clear();
      this.toastService.showError('Server Error', 'Something went wrong on the server. Please try again later.');
      this.router.navigate(['some-thing-happend-wrong']);
      return;
    }
    else if (err.status == 401 && this.GetLoggedInUser() != null) {
      console.clear();
      this.toastService.showWarning('Access Denied', 'You do not have permission to access this resource.');
      this.router.navigate(['access-denied']);
      return;
    }
    else {
      var eModel = new ErrorModel();
      eModel.StatusCode = err.status;
      if (err.error.Message) {
        eModel.Message = err.error.Message;
        this.toastService.showError('Error', err.error.Message);
      } else {
        this.toastService.showError('Error', 'An unexpected error occurred.');
      }
      console.clear();
      return eModel;
    }
  }


  private getHeader(isAuth: boolean = false) {
    var reqHeader: any;
    var token = this.GetAuthToken();
    if (isAuth) {
      reqHeader = new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      );
    }
    else {
      reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return { headers: reqHeader };
  }

  setdate(date: any) {
    var d = new Date(date);
    var month = (d.getMonth() + 1).toString();
    var day = (d.getDate()).toString();
    var year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    var datedata = year + "-" + month + "-" + day;
    return datedata;
  }

}