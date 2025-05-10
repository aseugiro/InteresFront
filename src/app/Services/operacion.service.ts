import { Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import {Global} from './global';
import { Calculo } from "../model/calculo";
@Injectable()
export class OperacionService implements OnInit {

    public url:string;

    constructor(  
        private _http:HttpClient
    ){
      this.url=Global.url;
    }


    ngOnInit() {
        
    }


    postInteres(calculo:Calculo):Observable<any>{

        let params=JSON.stringify(calculo);
        let headers=new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'calcular-interes',params,{headers:headers} )
    }


    getHistorial(id:Number):Observable<any>{
        return this._http.get(this.url+"historial-calculos",{
            params: {
                id: id.toString()
              },
        })
    }
}