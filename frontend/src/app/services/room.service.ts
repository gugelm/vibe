import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoom<T>(_id): Observable<T> {
    return this.http.get<T>('https://localhost/api/rooms/'+_id);
  }

  enterRoom<T>(_id): Observable<T> {
    return this.http.put<T>('https://localhost/api/rooms/enter/'+_id,{});
  }
  
  updateVibe<T>(vibe): Observable<T> {
    var body = {
      "vibe": vibe
    };
    return this.http.put<T>('https://localhost/api/vibes/update/5d2add3684899d2b0c10f158', body);
  }
}
