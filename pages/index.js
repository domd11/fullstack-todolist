
import react, { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'

export default function Home() {

  const [user, setUser] = useState(true)

  

  return (
    <div className="container">
    <h1 className='title home-title'>Nextjs Todo List</h1>
      {user ? <Login /> : <Register />}
      <small className="toggle" onClick={() => {setUser(!user)}}>{user ? "Not" : "Already"} a user? Click here to {user ? "register" : "login"}!</small>
      <hr />
      <p>This website includes user authentication and you can create tasks that have a desciption. You can also toggle tasks. Overall, this is a very basic todo list using firebase and nextjs that anyone could make if they want to. All of this took me a total for 1 hour maybe less and anyone could do this if they wanted to. Some of the things that I will teach you are:
        <li>How to use and connect to firebase</li>
        <li>How to create collections</li>
        <li>How to create, read, delete, and update firebase documents</li>
        <li>How to add icons to your projects</li>
        <li>How to use bootstrap</li>
        <li>How you can use this project and improve it to make it your own!</li>
      <strong>Contact me at dominiquedesertb@gmail.com if you want a video about how I made this.</strong></p>
    </div>
  )
}
