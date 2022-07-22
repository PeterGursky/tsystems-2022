import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  webSocket? : WebSocket;
  stompClient?: Stomp.Client;
  wsUrl = "ws://localhost:8080/ws";

  constructor() { }

  connect(): Observable<boolean> {
    return new Observable(subscriber => {
      this.webSocket = new WebSocket(this.wsUrl);
      this.stompClient = Stomp.over(this.webSocket);
      this.stompClient.connect({}, frame => subscriber.next(true), error => subscriber.next(false));
    });
  }

  sendHello(name: string) {
    this.stompClient?.send("/app/hello", {}, '{"name":"' + name + '"}');
//    this.stompClient?.send("/app/hello", {}, JSON.stringify({name}));
  }
}
