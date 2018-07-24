import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchDataFromChatState {
    forecasts: ChatData[];
    loading: boolean;
}

export class Test extends React.Component<RouteComponentProps<{}>, FetchDataFromChatState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('api/Chat/ChatData')
            .then(response => response.json() as Promise<ChatData[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Test.renderChat(this.state.forecasts);

        return <div>
            <h1>Chat</h1>
            {contents}
        </div>;
    }

    private static renderChat(forecasts: ChatData[]) {
        return <div>
            {forecasts.map(forecast =>
                <div className="msg-container">
                    <h3>{forecast.author}</h3>
                    <p>{forecast.message}</p>
                    <p className="msg-date">{forecast.date}</p>
                </div>
            )}
            </div> ;
    }
}

interface ChatData {
    author: string;
    message: string;
    date: string;
    color: string;
}
