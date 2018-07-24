import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Test } from './components/Test';
import { ChatContainer } from './components/ChatContainer';

export const routes = <Layout>    
    <Route path='/' component={ChatContainer} />
</Layout>;
