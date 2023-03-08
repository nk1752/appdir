'use client'

import styles from '../styles.module.css'
import { useEffect, useState, useRef } from 'react'

import {Amplify, Auth} from 'aws-amplify'
import config from '../../../cognito/cognito-config'

Amplify.configure(config)

function Signin() {

    const [code, setCode] = useState('')
    const [jwtToken, setJwtToken] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const count = useRef('')
    const [cognitoUser, setCognitoUser] = useState(null)

    async function handleSignIn() {
            
        try {
            const cognitoUser = await Auth.signIn(username, password);
            
            console.log(cognitoUser);
            setCognitoUser(cognitoUser);
            localStorage.setItem('cognitoUser', JSON.stringify(cognitoUser))
              //GoToCodePage();
        
        } catch (error) {
            console.log('error signing in', error);
        }
    
      }
    
      async function handleConfirmSignIn() {

        try {
          const loggedUser = await Auth.confirmSignIn(cognitoUser, code, 'SMS_MFA')
          
          console.log(code)
          console.log(loggedUser)
    
          const JwtToken = loggedUser.getSignInUserSession()?.getAccessToken()?.getJwtToken() || '';
    
          setJwtToken(JwtToken)
    
                
        
        } catch (error) {
          console.log('error signing in', error);
        }
      }
    

    return (
        <div className={styles.right}>
            
            
            <button type='button' onClick={ handleSignIn }>Sign In</button><br />
            <button type='button' onClick={ handleConfirmSignIn }>Verify Code</button><br />
           
            
            
            <form  className={styles.card} onSubmit={handleConfirmSignIn}>
                
                <label>Username: <input  type="text" value={username}  onChange={(e) => setUsername(e.target.value)} />  </label><br />
                <label>Password: <input  type="text" value={password}  onChange={(e) => setPassword(e.target.value)} />  </label><br />

                <label>MFA Code: <input  type="text" value={code}  onChange={(e) => setCode(e.target.value)} />  </label><br />
          
            </form>

        </div>

    )
}

export default Signin;