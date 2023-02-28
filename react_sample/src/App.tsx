import React, { useState } from 'react';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH'
});

function App() {
  const [username, setUsername] = useState('');
  const [inputJwt, setInputJwt] = useState('');
  const [text, setText] = useState('');

  async function handleLogin() {
    try {
      await Auth.signUp({
        username: username,
        password: 'Password@98765',
      });
      console.log('signUp');
    } catch (error) {
      console.log('Error signing up:', error);
    }
    try {
      const challenge = await Auth.signIn(username, "");
      console.log(challenge);
      if (challenge.challengeName === 'CUSTOM_CHALLENGE') {
        const user = await Auth.sendCustomChallengeAnswer(challenge, inputJwt);
        console.log(user);
      }
      console.log('Login success');
      setText('Success');
    } catch (error) {
      console.log('Error signing in:', error);
      setText('Error');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        Username : <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        JWT : <input type="text" placeholder="InputJwt" onChange={(e) => setInputJwt(e.target.value)} />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>{text}</div>
    </div>
  );
}

export default App;
