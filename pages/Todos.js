import React from 'react'
import { FcTodoList } from 'react-icons/fc'
import { MdAddTask } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { db } from '../firebase';
import { collection, deleteDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from 'firebase/auth';
import Router, { useRouter } from 'next/router';
const Todos = () => {
      const [todo, setTodo] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  const [active, setActive] = useState("All"); 

  
  const [todos, setTodos] = useState([]);


  const date = new Date(); 


  const auth = getAuth(); 
  const router = useRouter(); 
    const [user, loading] = useAuthState(auth);

  const addTodo = () => {
    setDoc(doc(db, `users/${user.uid}/todos`, todo), {
      name: todo, 
      description: todoDesc, 
      complete: false, 
      dateAdded: date, 
    })




    setTodo("")
    setTodoDesc("")

  }

  const getData = async () => {
    const databaseRef = collection(db, `users/${user.uid}/todos`)
        const q = query(databaseRef, orderBy("complete"))
    await getDocs(q) 
      .then((response) => {
        setTodos(response.docs.map((data) => {
          return {...data.data(), id: data.id}
        })); 
      })
  }

  const test = () => {
    addTodo(); 
    getData(); 
  }

  const updateComplete = async (todo) => {
    const todoRef = doc(db, `users/${user.uid}/todos`, todo.id)

    updateDoc(todoRef, { complete: !todo.complete }, { merge: true });

    getData();
  }

  const deleteTask = async (todo) => {
    const todoRef = doc(db, `users/${user.uid}/todos`, todo.id)

    await deleteDoc(todoRef);

    getData();
  }

  const changeActive = (value) => {
    setActive(value);
    console.log(active);
  }

  useEffect(() => {
    if (!loading && user) {
        getData();
    }
  }, [loading])


  

  if (loading) {
    return (
        <div class="d-flex justify-content-center container-loader">
  <div class="spinner-border center" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    )
  }

  if (!user) {
    return <h1 style={{ textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {router.push("/")}}>Return Back Home</h1>
  }

  return (
    <div className='container'><div><FcTodoList className='icon'/><h2 className='title'>Todolist</h2> <button type="button" class="btn btn-danger" onClick={() => {auth.signOut()}}>Logout</button>
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1"><MdAddTask /></span>
        <input type="text" className="form-control" placeholder="Task" aria-label="Task" aria-describedby="basic-addon1" value={todo} onChange={(e) => {setTodo(e.target.value)}} />
    </div>
    <div class="form-floating">
       <textarea class="form-control" placeholder="Task Description" id="floatingTextarea" value={todoDesc} onChange={(e) => {setTodoDesc(e.target.value)}}></textarea>
      <label for="floatingTextarea">Task Description</label>
    </div>
    <br />
    <button type="button" className="btn btn-success" onClick={test}>Add Task</button>
<hr />
        
<br />
    {todos.map((todo) => {
      return (
      
          <div class={!todo.complete ? "card text-bg-light mb-3 todo" : "card text-bg-success mb-3 todo"} key={Math.random()}>
        <div class="card-header">
        
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" checked={todo.complete} onChange={() => {updateComplete(todo)}} />
          <label class="form-check-label" for="flexCheckIndeterminate">
           Complete Task
          </label>
        </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{todo.name}</h5>
          <p class="card-text">{todo.description}</p>
          {!todo.complete ? <button type="button" class="btn btn-danger" onClick={() => {deleteTask(todo)}}>Delete {todo.name}</button> : ""}
          </div>
      </div>
      

        
      )
    })}</div>
  )
}

export default Todos