
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';
import About from './About';
import Signin from './Authentication/Signin';
import { Account } from './contexts/Account'
import { CustomAxios } from './contexts/CustomAxios';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import {Amplify} from 'aws-amplify';


Amplify.configure({
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_qY0eJKuWO',
    aws_user_pools_web_client_id: 'ulab4268c8852f8bgsfbf5jgl',
  });

// const {
//   REACT_APP_BROWSE_HOST: browseHost,
//   REACT_APP_RESTAURANT_HOST: restaurantHost,
//   REACT_APP_CREATEREACTAPP_HOST: process.en,
// } = process.env;

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_DSAPORTAL_HOST: dsaPortalHost,
  REACT_APP_FCUPORTAL_HOST: fcuPortalHost,
} = process.env;

console.log(fcuPortalHost);

const FcuPortal = ({ history }) => (
  <MicroFrontend history={history} host={fcuPortalHost} name="FcuPortal" />
);

const DsaPortal = ({ history }) => (
  <MicroFrontend history={history} host={dsaPortalHost} name="DsaPortal" />
);

const App = () => (
  <BrowserRouter>
  <Account>
    <React.Fragment>
    <ReactNotifications />
      <AppHeader />
      <Routes>
      <Route exact path="/" element={<Signin/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/fcuPortal/*" element={<FcuPortal/>} />
        <Route exact path="/dsaPortal/*" element={<DsaPortal/>} />
      </Routes>
    </React.Fragment>
    </Account>
  </BrowserRouter>
);

export default App;