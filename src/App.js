import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Signin from './Signin';
import { Amplify } from 'aws-amplify';

function App() {

  Amplify.configure({
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_qY0eJKuWO',
    aws_user_pools_web_client_id: 'ulab4268c8852f8bgsfbf5jgl',
  });

  return (
    
    <Routes>
    <Route index path="/" element={<Signin/>} />
    </Routes>
  );
}

export default App;
