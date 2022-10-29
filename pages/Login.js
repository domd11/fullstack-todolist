import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { app } from '../firebase';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { useAuthState } from "react-firebase-hooks/auth"
import { Router, useRouter } from 'next/router';
 
const Login = () => {
    const [email, setEmail] = useState(""); 
    const [pwd, setPwd] = useState("");
 

  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, pwd)
        .then(((useCredential) => {
            const user = useCredential.user; 
            console.log(user)
            router.push("/Todos")
        }))

  }

  if (loading) {
    return (
        <div class="d-flex justify-content-center container-loader">
  <div class="spinner-border center" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    )
  }
   
  return (
    <div className='container'>
        <div>
            <h2>Login</h2>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                    <MdAlternateEmail />
                </span>
                <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                    <MdPassword />
                </span>
                <input type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
            </div>

            <button type="button" class="btn btn-success" onClick={signIn}>Login</button>

        </div>
    </div>
  )
}

export default Login