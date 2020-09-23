import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../interfaces'
import { Observable } from 'rxjs/index';


@Injectable()
export class SocketService {
  private socket: any

  initSocket() {

    this.socket = io(environment.SOCKET_ENDPOINT) //environment.SOCKET_ENDPOINT
  }

  listen(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('my message', (message: ChatMessage) => observer.next(message))
    })
  }

  sendMessage(message: ChatMessage) {
    this.socket.emit('my broadcast', message)
  }

}
