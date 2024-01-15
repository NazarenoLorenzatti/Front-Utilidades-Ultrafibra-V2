import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { MessageAlert } from '../../templates/models/MessageAlert.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
 // private messageSubjet: BehaviorSubject<MessageAlert[]> = new BehaviorSubject<MessageAlert[]>([])

  private snmpNotificationsSubject: Subject<any> = new Subject<any>();
  private pingNotificationsSubject: Subject<any> = new Subject<any>();


  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:8080/web-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.reconnect_delay = 2000;
    this.joinRoom();
  }

  joinRoom() {
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(`/topic/snmp-notifications`, (messages: any) => {
        this.snmpNotificationsSubject.next(JSON.parse(messages.body));
      });

      this.stompClient.subscribe(`/topic/ping-notifications`, (messages: any) => {
        this.pingNotificationsSubject.next(JSON.parse(messages.body));
      });

    }, (error: any) => {
      console.error('Error during Stomp connection:', error);
    });
  }

 /* getMessageSubject() {
    return this.messageSubjet.asObservable();
  }*/


  subscribeToSnmpNotifications(): Observable<any> {
    return this.snmpNotificationsSubject.asObservable();
  }

  subscribeToPingNotifications(): Observable<any> {
    return this.pingNotificationsSubject.asObservable();
  }
}