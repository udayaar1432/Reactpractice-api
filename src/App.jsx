
import { useEffect, useState } from 'react'
import './App.css'
import Todo from './todolist'
import axios from 'axios';
import TodoJson from './todolist/todojson';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  function handelClickAdd() {
    axios.post("http://localhost:3000/posts", {
      title: 'Fred',
      author: 'Flintstone'
    })
      .then(function (response) {
        console.log(response);
      })
  }

function handelClickEdit(){
  axios.put("http://localhost:3000/posts/4",{title: 'hii',
  author: 'chethanbaghath'
  })
  .then(function(response){
    console.log(response)
  })
  }


  function handelClickDelete(id) {
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then(function(response){
      console.log(response)
      
    })
    const filterId = data.filter((a)=>
      a.id !== id);
      setData(filterId)
  }

  return (
    <div>
      {/* <Todo/> */}
      <TodoJson/>
      {data.map((item) => (
        <div key={item.id}>
          <p> {item.id}-
           {item.title}-
            {item.author} <button onClick={()=>handelClickDelete(item.id)}>Delete</button></p>
        </div>
      ))
      }
      <button onClick={handelClickAdd}>post</button>
      <button onClick={handelClickEdit}>Put</button>
    </div>
  )
}

export default App
