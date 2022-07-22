import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  name = '';

  constructor(private chatService: ChatService, 
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  connect() {
    this.chatService.connect().subscribe(success => {
      if (success) {
        this.snackbarService.successMessage("Connected to chat server");
        this.chatService.sendHello(this.name);
      } else {
        this.snackbarService.errorMessage("Cannot connect to chat server.");
      }
    });
  }
}
