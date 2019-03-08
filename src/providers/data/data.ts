import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
//baseUrl: string = 'http://localhost:80/finnovation/api/';
//imgUrl: string = 'http://localhost:80/finnovation/admin/';
baseUrl: string = 'http://www.finnovationworld.com/secure-backend/api/';
imgUrl: string = 'http://www.finnovationworld.com/secure-backend/admin/';

logged: boolean = false;
userid: string = '';
mychats: number = 0;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }
getbaseUrl()
{
  return this.baseUrl;
}
getimgUrl()
{
  return this.imgUrl;
}
getLogged()
{
  return this.logged;
}
getuserId() {
  return this.userid;
}
setuserId(uid) {
  this.userid = uid;
}
setLogged(log: boolean) {
  this.logged = log;
}
getMychats() {
  return this.mychats;
}
setMychats(n: number) {
  this.mychats = n;
}
}
