import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SendForm } from './SendForm';
import { MessagesContainer } from './MessagesContainer';
import { MessageContainer } from './MessageContainer';

export class ChatContainer extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="chat-container">
            <MessagesContainer />            
            <hr/>
            <SendForm />
        </div>;
    }
}