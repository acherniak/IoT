import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Message } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	bypass = { headers: new HttpHeaders({'ngsw-bypass':'true'}) };
	start = [40.5254, -74.3912];
  constructor(private http: HttpClient) { }

	fetch() { return this.http.get<Message[]>('api') }
	reset() { return this.http.delete('api') }
	put(msg: Message) { this.http.put('api', msg).subscribe(()=>{}) }
}
