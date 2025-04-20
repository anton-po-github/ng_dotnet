import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

interface ChatMsg {
  user: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: false
})
export class ChatComponent implements OnInit {
  public messages: string[] = [];
  public user = '';
  public message = '';
  private hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5477/hubs/chat')
    .build();

  ngOnInit(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error(err));

    this.hubConnection.on(
      'NewMessageNotification',
      (user: string, message: string) => {
        if (user !== this.user) {
          this.showNotification(`${user} sent: ${message}`);
        }
      }
    );

    this.hubConnection.on('ReceiveMessage', (user: string, text: string) => {
      this.messages.push(`${user}: ${text}`);
    });

    this.hubConnection.on('LoadHistory', (history: ChatMsg[]) => {
      history.forEach((m) => this.messages.push(`${m.user}: ${m.text}`));
    });
  }

  public showNotification(message: string): void {
    alert(`💬 New message: ${message}`);
  }

  public sendMessage(): void {
    if (this.user && this.message) {
      this.hubConnection
        .invoke('SendMessage', this.user, this.message)
        .catch((err) => console.error(err));
      this.message = '';
    }
  }
}
