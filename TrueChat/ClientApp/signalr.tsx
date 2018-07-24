import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { ChatData } from './components/MessagesContainer';

export interface ReceiveMessageCallbackProps {
    message: string;
    username: string;
}

export class SignalrController {

    private connection: HubConnection | undefined;

    public static instance: SignalrController = new SignalrController();

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/hubs/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.start().catch(err => console.error(err.toString()));
        console.log("Starting signalr connection");
    }

    public send(username: string, message: string, color: string) {   
        console.log("Sending message...");
        if (this.connection != undefined) {   
            console.log("Send message "+color);
            this.connection.invoke("SendMessage", username, message, color).catch(err => console.error(err.toString()));            
        }        
    }

    public onReceiveMessage(callback: any) {        
        if (this.connection != undefined) {            
            this.connection.on("ReceiveMessage", (username, message, color) => {
                console.log("Receive message " + color);
                var d = new Date();
                var data: ChatData = { message: message, author: username, date: d.getTime() - d.getTimezoneOffset()*60*1000, color: color };
                callback(data);
            });
        }        
    }

}