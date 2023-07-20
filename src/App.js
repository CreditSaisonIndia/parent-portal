
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import MicroFrontend from './MicroFrontend';
import About from './About';

// const {
//   REACT_APP_BROWSE_HOST: browseHost,
//   REACT_APP_RESTAURANT_HOST: restaurantHost,
//   REACT_APP_CREATEREACTAPP_HOST: process.en,
// } = process.env;

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
  REACT_APP_FCUPORTAL_HOST: fcuPortalHost,
} = process.env;

console.log(fcuPortalHost);

const FcuPortal = ({ history }) => (
  <MicroFrontend history={history} host={fcuPortalHost} name="FcuPortal" />
);

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <AppHeader />
      <Routes>
        <Route exact path="/" element={<About/>} />
        <Route exact path="/fcuPortal" element={<FcuPortal/>} />
      </Routes>
    </React.Fragment>
  </BrowserRouter>
);

export default App;