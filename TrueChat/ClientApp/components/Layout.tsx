import * as React from 'react';
import { HeaderContainer } from './HeaderContainer';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container'>
            <div className="header-layout">
                <HeaderContainer/>
            </div>
            <div className='row'>                
                <div className='col-md-auto'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
