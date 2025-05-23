import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

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
    .withUrl(environment.baseUrl + 'hubs/chat')
    .build();

  ngOnInit(): void {
    this.hubConnection
      .start()
      .then(() => console.warn('SignalR connected'))
      .catch((err) => console.error(err));

    this.hubConnection.on(
      'NewMessageNotification',
      (user: string, message: string) => {
        if (user !== this.user) {
          this.showNotification(`${user} from: ${message}`);
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
