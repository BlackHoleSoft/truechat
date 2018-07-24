import * as React from "react";
import { RouteComponentProps } from "react-router";


export class HeaderContainer extends React.Component<any, UserData> {

    constructor() {
        super();
        UserInfo.load(this);
    }

    public render() {        
        return <div className="header-container">
            <img src="/icon.png" height="42px" />
            <h2>{UserInfo.globalInfo.name}</h2>
            <a href="/Auth/LogOut">Log Out</a>
            <hr/>
        </div>;
    }
}

export interface UserData {
    name: string
}

export class UserInfo {

    public static globalInfo: UserData = { name: "" };

    public static load(container: React.Component) {
        fetch('/api/Chat/Username', {
            credentials: "same-origin"
        })
            .then(response => response.json() as Promise<UserData>)
            .then(data => {
                UserInfo.globalInfo = data;
                container.setState(data);
            });
    }
}