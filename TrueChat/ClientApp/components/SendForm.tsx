import * as React from 'react';
import { SignalrController } from '../signalr';
import { UserInfo } from './HeaderContainer';

export class SendForm extends React.Component {

    constructor() {
        super();
    }

    public static msgColors = [
        "#232323", "#686868", "#923232", "#329223"
    ];

    public render() {        
        return <div className="sendform-container">
            <div className="sendform-left">
                <textarea id="send_msg" className="sendform-textarea" onKeyUp={this.onTextAreaKeyDown}></textarea>
            </div>       
            <div className="sendform-right">
                <div className="sendform-right-top">
                    <button id="btn_send" className="sendform-btn">Send</button>
                </div>
                <div className="sendform-right-bottom">
                    <input type="radio" name="msg-color" value="0" defaultChecked id="sendform-msgcolor-0" />
                    <label htmlFor="sendform-msgcolor-0"><span></span></label>
                    <input type="radio" name="msg-color" value="1" id="sendform-msgcolor-1" />
                    <label htmlFor="sendform-msgcolor-1"><span></span></label>
                    <input type="radio" name="msg-color" value="2" id="sendform-msgcolor-2" />
                    <label htmlFor="sendform-msgcolor-2"><span></span></label>
                    <input type="radio" name="msg-color" value="3" id="sendform-msgcolor-3" />
                    <label htmlFor="sendform-msgcolor-3"><span></span></label>
                </div>
            </div>
        </div>;
    }

    public componentDidMount() {
        this.initForm();
    }

    private onTextAreaKeyDown() {
        console.log("tarea onkeydown");
        var btnSend = document.getElementById("btn_send");
        var tArea = document.getElementById("send_msg");
        if (btnSend != null && tArea != null) {
            (btnSend as HTMLButtonElement).disabled = ((tArea as HTMLTextAreaElement).value as string).length == 0;
        }        
    }

    private initForm() {
        var btnSend = document.getElementById("btn_send");
        var tArea = document.getElementById("send_msg");
        var rButtons = document.getElementsByName('msg-color');
        if (btnSend != null && tArea != null && tArea.textContent != null) {
            (btnSend as HTMLButtonElement).disabled = ((tArea as HTMLTextAreaElement).value as string).length == 0;
            btnSend.addEventListener("click", event => {
                console.log("Send clicked");
                var color = 0;
                if (rButtons != null) {
                    for (var i = 0; i < rButtons.length; i++) {
                        if ((rButtons[i] as HTMLInputElement).checked) {
                            color = Number((rButtons[i] as HTMLInputElement).value);
                        }
                    }
                }
                SignalrController.instance.send(UserInfo.globalInfo.name, (tArea as HTMLTextAreaElement).value as string, SendForm.msgColors[color]);
                (tArea as HTMLTextAreaElement).value = "";
                (btnSend as HTMLButtonElement).disabled = ((tArea as HTMLTextAreaElement).value as string).length == 0;
            });
        }
    }
}