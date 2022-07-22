import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage, ChatService } from 'src/services/chat.service';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  name = '';
  messages: ChatMessage[] = [];
  messageToSend = '';

  constructor(private chatService: ChatService, 
              private snackbarService: SnackbarService) { }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }

  ngOnInit(): void {
  }

  connect() {
    this.chatService.connect().subscribe(success => {
      if (success) {
        this.snackbarService.successMessage("Connected to chat server");
        this.chatService.listenGreetings().subscribe(greeting => {
          this.messages = [...this.messages, new ChatMessage("SERVER", greeting)];
        });
        this.chatService.listenMessages().subscribe(message => {
          this.messages = [...this.messages, message];
        });
        this.chatService.sendHello(this.name);
      } else {
        this.snackbarService.errorMessage("Cannot connect to chat server.");
      }
    });
  }

  sendMessage(){
    this.chatService.sendMessage(this.messageToSend);
  }

  disconnect(){
    this.chatService.disconnect();
  }
}
