import * as React from 'react';
import { SendForm } from './SendForm';

interface MessageState {    
    isDelivered: boolean;
    isSent: boolean
}

export class MessageContainer extends React.Component<any, MessageState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isDelivered: false, isSent: false
        };
    }

    public render() {
        var style = { backgroundColor: this.props.color };
        return <div className="message-container" style={style} key={this.props.date}>
            <h3 className="message-author">{this.props.author}</h3>
            <p className="message-msg">{this.props.message}</p>
            <p className="message-date">{this.formatDate(this.props.date)}</p>
        </div>;
    }

    private formatDate(date: number): string {
        var now = new Date();
        var dateOffset = ((now.getTime() - now.getTimezoneOffset() * 60 * 1000) - date) / 1000 / 60; //in minutes
        if (dateOffset < 1) {
            return (dateOffset * 60).toFixed(0) + " sec ago";
        }
        if (dateOffset < 10) {
            return (dateOffset).toFixed(0) + " min ago";
        } else {
            var dateObj = new Date(date + now.getTimezoneOffset()*60000);
            var options = {
                //era: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                weekday: 'short',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric'
                //second: 'numeric'
            };
            //return dateObj.toTimeString().substring(0, 5) + " " + dateObj.getUTCDay() + "." + dateObj.getUTCMonth() + "." + dateObj.getFullYear();
            return dateObj.toLocaleString("ru", options);
        }
    }

}