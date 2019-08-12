import { Component, OnInit, ElementRef, Renderer2, ViewChild  } from '@angular/core';
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
  vibe:any = '';
  myVar:any;
  vibers:any = 0;

  @ViewChild('laughVibe', { static: false }) 
  laughVibe: ElementRef;	
  @ViewChild('smileVibe', { static: false }) 
  smileVibe: ElementRef;
  @ViewChild('wowVibe', { static: false }) 
  wowVibe: ElementRef;
  @ViewChild('sadVibe', { static: false }) 
  sadVibe: ElementRef;
  @ViewChild('angryVibe', { static: false }) 
  angryVibe: ElementRef;
  constructor(private roomService: RoomService, private socket: Socket, private renderer: Renderer2) { }
  
  ngOnInit() {
    const that = this;
    this.socket
      .on("rooms", function (data) {
        that.room.vibes = data.vibes;
        // console.log(data);
        // that.vibers = data.vibers;
      });

    this.socket
      .on("vibers", function (data) {
        that.vibers = data.vibers;
        that.room.vibers = data.vibers;
        // console.log(that.vibers);
      });

    this.socket
      .on("vibe", function (data) {
        // console.log(data);
       
        that.vibe = data.vibe;
        clearTimeout(that.myVar);
        that.myVar = setTimeout(() => {
          that.vibe = '';
        }, 1000)
        
        switch (data.vibe) {
          case 'laugh':
            var ref = that.laughVibe.nativeElement;
            break;
          case 'smile':
            var ref = that.smileVibe.nativeElement;
            break;
          case 'wow':
            var ref = that.wowVibe.nativeElement;
            break;
          case 'sad':
            var ref = that.sadVibe.nativeElement;
            break;
          case 'angry':
            var ref = that.angryVibe.nativeElement;
            break;
          default:
            break;
        }
        if(ref){

          const div1 = that.renderer.createElement('div');
          that.renderer.addClass(div1, 'box');
          that.renderer.addClass(div1, 'box2');
          that.renderer.appendChild(ref, div1);
  
          const div2 = that.renderer.createElement('div');
          that.renderer.addClass(div2, 'box');
          that.renderer.addClass(div2, 'box1');
          that.renderer.appendChild(ref, div2);
  
          // let that = this;
          setTimeout(() => {
            that.renderer.removeClass(div1, 'box2');
            that.renderer.addClass(div1, 'box1');
  
          }, 100)
          setTimeout(() => {
            that.renderer.removeChild(ref, div1);
            that.renderer.removeChild(ref, div2);
          }, 1000)
        }
      });

    // this.roomService.enterRoom('5d2add3684899d2b0c10f158')
    //   .subscribe((success) => {
    //     // console.log(success);

    //     this.room = success;
    //   }, (error) => {
    //     console.log(error);
    //   });

    this.roomService.getRoom('5d2add3684899d2b0c10f158')
      .subscribe((success) => {
        // console.log(success);
        
        this.room = success;
      }, (error) => {
        console.log(error);
      });
  }

  onSelect(vibe): void {
    this.playAudio();

    this.roomService.updateVibe(vibe)
      .subscribe((success) => {
        // console.log(success);
        // this.room = success;
      }, (error) => {
        console.log(error);
      });
  }

  playAudio() {
    console.log("sound");
    
    let audio = new Audio();
    audio.src = "../../../assets/aqua4.mp3";
    audio.load();
    audio.play().then(response => {
      console.log(response);
      
    }).catch(error => {
      console.log(error);
      
    });
  }

}
