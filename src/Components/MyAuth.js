import React from 'react';
import {auth, provider} from '../Firebase-Config/firebaseConfig.js';
import {signInWithPopup} from 'firebase/auth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function MyAuth({setIsAuth}) {

    const signInWithGoogle = async()=>{
      try {
        const result = await signInWithPopup(auth,provider);
      console.log(result);
      cookies.set('authToken',result.user.refreshToken);
      setIsAuth(true);
        
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='auth'>
        <h4> Sign In with Google To Continue</h4>
        <button type='button' className='btn btn-outline-primary mt-5' onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default MyAuth