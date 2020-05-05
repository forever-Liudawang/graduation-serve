import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { of, Observable } from 'rxjs';

@WebSocketGateway()
export class EventsGateway {
  user=0
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): Observable<WsResponse<any>> {
  //   return of({event: 'message', data: 200});
  // }


  @SubscribeMessage('link')
  handleConnect(client: any, payload: any) {
    this.user++;
    client.emit('link',{userNum:this.user,userName:payload})
    client.broadcast.emit('link',{userNum:this.user,userName:payload})
  }

  @SubscribeMessage('send')
  handleSend(client: any, payload: any){
    client.emit('message',payload)
    client.broadcast.emit('message',payload)
  }
}
