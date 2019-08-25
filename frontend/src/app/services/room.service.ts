import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoom<T>(_id): Observable<T> {
    return this.http.get<T>('https://vibe-demo.herokuapp.com/api/rooms/'+_id);
  }

  enterRoom<T>(_id): Observable<T> {
    return this.http.put<T>('https://vibe-demo.herokuapp.com/api/rooms/enter/'+_id,{});
  }
  
  updateVibe<T>(vibe): Observable<T> {
    var body = {
      "vibe": vibe
    };
    return this.http.put<T>('https://vibe-demo.herokuapp.com/api/vibes/update/5d62b41a143a5e00171bdf06', body);
  }
}
