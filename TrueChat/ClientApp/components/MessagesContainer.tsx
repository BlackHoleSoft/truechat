import * as React from 'react';
import 'isomorphic-fetch';
import { MessageContainer } from './MessageContainer';
import * as signalR from '@aspnet/signalr';
import { SignalrController } from '../signalr';

export interface ChatData {
    author: string;
    message: string;
    date: number;
    color: string;
}

interface FetchDataFromChatState {
    messages: ChatData[];
    loading: boolean;
}

export class MessagesContainer extends React.Component<any, FetchDataFromChatState> {

    private counter = 0;
    private scrolledUp: boolean = false;
    private scrolledDown: boolean = true;

    constructor() {
        super();
        this.state = { messages: [], loading: false };

        this.fetchFromDb(0); //fetch last 10 entries

        SignalrController.instance.onReceiveMessage((msg: ChatData) => {
            if (this.counter == 0) {
                this.state.messages.push(msg);
                this.setState(this.state);
            }            
        });
    }

    public render() {
        var content;
        if (this.state.loading) {
            content = <p>Loading...</p>
        } else {
            content = this.state.messages.map(msg => <MessageContainer
                key={msg.date}
                message={msg.message}
                author={msg.author}
                date={msg.date}
                color={msg.color}
            />);
        }

        var nextbtn = <button onClick={() => {
            this.fetchFromDb(--this.counter);
        }}>Next</button>;

        if (this.counter > 0) (content as any[]).push(nextbtn);

        return <div className="messages-container" style={{ height: window.innerHeight * 0.7 }} id="msgs-container">
            <button onClick={() => this.fetchFromDb(++this.counter)}>Prev</button>
            {content}
        </div>;
    }

    public componentDidUpdate() {
        var block = document.getElementById("msgs-container");
        if (block != null) {
            if (this.counter == 0) block.scrollTop = block.scrollHeight;
            /*if (this.scrolledUp) {
                block.scrollTop = block.scrollHeight;
                this.scrolledDown = true;
                this.scrolledUp = false;
            } else if (this.scrolledDown) {
                block.scrollTop = 0;
                this.scrolledUp = true;
                this.scrolledDown = false;
            }
            block.onscroll = () => {
                if (block != null) {
                    if (block.scrollTop == 0 && !this.scrolledUp) {
                        this.scrolledUp = true;
                        console.log("Fetch with chunk " + (this.counter + 1));
                        this.fetchFromDb(++this.counter);
                    }

                    if (block.scrollTop + block.clientHeight >= block.scrollHeight - 10 && !this.scrolledDown && this.counter > 0) {
                        this.scrolledDown = true;
                        this.counter--;
                        if (this.counter < 0) this.counter = 0;
                        console.log("Fetch with chunk " + this.counter);
                        this.fetchFromDb(this.counter);
                    }

                    if (block.scrollTop > 10) {
                        this.scrolledUp = false;
                    }

                    if (block.scrollTop + block.clientHeight < block.scrollHeight - 30) {
                        this.scrolledDown = false;
                    }
                }                
            }*/
        }  
    }

    private fetchFromDb(chunk: number) {
        fetch('api/Chat/ChatData/' + chunk)
            .then(response => response.json() as Promise<ChatData[]>)
            .then(data => {
                if (data.length == 0 && this.counter > 0) {
                    this.counter--;
                    this.fetchFromDb(this.counter);
                }
                this.setState({ messages: data, loading: false });                
                //this.setState({ messages: data.concat(this.state.messages), loading: false });
            });
    }

}