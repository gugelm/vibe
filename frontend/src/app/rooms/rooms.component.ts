import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  providers: [RoomService]
})
export class RoomsComponent implements OnInit {

  title = 'vote-demo';
  room:any = {
    "title": "",
    "season": 0,
    "episode": 0,
    "vibers": 0,
    "vibes": {
      "laugh": 0,
      "smile": 0,
      "wow": 0,
      "sad": 0,
      "angry": 0
    }
  };

  constructor(private roomService: RoomService, private socket: Socket) { }
  
  ngOnInit() {
    const that = this;
    this.socket
      .on("rooms", function (data) {
        that.room = data;
        console.log(data);
      });

    this.roomService.enterRoom('5d2add3684899d2b0c10f158')
      .subscribe((success) => {
        // console.log(success);

        this.room = success;
      }, (error) => {
        console.log(error);
      });

    this.roomService.getRoom('5d2add3684899d2b0c10f158')
      .subscribe((success) => {
        // console.log(success);
        
        this.room = success;
      }, (error) => {
        console.log(error);
      });
  }

  onSelect(vibe): void {
    this.roomService.updateVibe(vibe)
      .subscribe((success) => {
        // console.log(success);
        // this.room = success;
      }, (error) => {
        console.log(error);
      });
  }

}
