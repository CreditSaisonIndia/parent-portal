
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import { onAuthUIStateChange } from '@aws-amplify/ui-components';

import {Amplify} from 'aws-amplify';


Amplify.configure({
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_qY0eJKuWO',
    aws_user_pools_web_client_id: 'ulab4268c8852f8bgsfbf5jgl',
  });

function Auth() {
   const [authState, setAuthState] = React.useState();
    
   React.useEffect(() => {
    //   return onAuthUIStateChange(newAuthState =>    
    //      setAuthState(newAuthState)
    //   );
   }, []);
    
   return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default Auth;