import { Component, OnInit } from '@angular/core';
import { MessagingService} from './services/messaging.service';
const userId = 'some userId';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebaseOne';
  message;
  constructor(private messagingService: MessagingService) {
  }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.tokenChanges();
    this.message = this.messagingService.currentMessage;
  }
}

