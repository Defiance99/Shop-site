import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { SocketService } from '../../services/socket.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription, Observable } from 'rxjs'
import { ChatMessage } from '../../interfaces'
import { trigger, style, state, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
  animations: [
    trigger('expandedPanel', [
      state('show', style({
        left: '*',
        top: '*',
        height: '*',
        width: '*',
        opacity: '1'
      })),
      state('hide', style({
        left: '97%',
        top: '90%',
        height: '10px',
        width: '10px',
        opacity: '0'
      })),
      transition('show <=> hide', animate('2000ms ease-out'))
    ])
  ]
})
export class ChatPageComponent implements OnInit {

  isExpanded: boolean = false
  state: string = 'show'

  formChat: FormGroup
  chatSub: Subscription
  messages: ChatMessage[] = []

  show: boolean = true

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.ioConnection()

    this.formChat = new FormGroup({
      userName: new FormControl("", [Validators.required, Validators.minLength(3)]),
      message: new FormControl("", [Validators.required, Validators.minLength(1)])
    })
  }

  ioConnection() {
    this.socketService.initSocket()

    this.socketService.listen()
      .subscribe((message: ChatMessage) => {
        this.messages.push(message)
      })
  }

  onSubmit() {
    let message = {
      userName: this.formChat.value.userName,
      message: this.formChat.value.message
    }
    this.socketService.sendMessage(message)
    console.log(this.formChat)
    this.formChat.controls.message.reset()
  }

  stateName() {
    this.show = !this.show
    this.state = this.show ? 'show' : 'hide'
  }

  moveChat(event: Event) {
    /* console.log(event)
    window.addEventListener('mouseup', function() {
      window.removeEventListener('mousemove', mouseMove)
    })

    window.addEventListener('mousemove', mouseMove)

    function mouseMove(event: Event) {

    } */
  }

}
