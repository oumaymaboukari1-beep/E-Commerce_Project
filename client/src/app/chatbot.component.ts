import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-chatbot',
  template: `
<h3>Chatbot</h3>
<div *ngFor="let msg of messages">
<p><b>{{msg.sender}}:</b> {{msg.text}}</p>
</div>
<input [(ngModel)]="userMessage" placeholder="Votre question..." />
<button (click)="sendMessage()">Envoyer</button>
  `
})
export class ChatbotComponent {
  messages: any[] = [];
  userMessage = '';
 
  constructor(private http: HttpClient) {}
 
  sendMessage() {
    this.messages.push({ sender: 'Vous', text: this.userMessage });
    this.http.post<any>('http://localhost:3001/chat', { message: this.userMessage })
      .subscribe(res => {
        this.messages.push({ sender: 'Bot', text: res.reply });
      });
    this.userMessage = '';
  }
}