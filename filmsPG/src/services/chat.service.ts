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
  myName = '';

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
    this.myName = name;
//    this.stompClient?.send("/app/hello", {}, JSON.stringify({name}));
  }

  sendMessage(msg:string) {
    const message = new ChatMessage(this.myName, msg);
    this.stompClient?.send("/app/message",{},JSON.stringify(message));
  }

  listenGreetings():Observable<string> {
    return new Observable( subscriber => {
      this.stompClient?.subscribe("/topic/greetings", message => {
        subscriber.next(JSON.parse(message.body).content);
      });
    });
  }

  listenMessages():Observable<ChatMessage> {
    return new Observable( subscriber => {
      this.stompClient?.subscribe("/topic/messages", message => {
        subscriber.next(JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    this.stompClient?.disconnect(()=>{});
//    this.webSocket?.close();
  }
}

export class ChatMessage {
  constructor(
    public name: string,
    public message: string
  ){}
}
