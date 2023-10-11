import axios from "axios";
import { useEffect, useState } from "react"




function TodoJson() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/todo")
            .then(res => res.json())
            .then(json => setTodos(json))
    }, [])

    function handelClickDelete(id) {
        axios(`http://localhost:3000/todo/${id}`)
            .then(function (response) {
                console.log(response)
            })
        const deleteId = todos.filter((a) =>
            a.id !== id);
        setTodos(deleteId)
    }

    function handelClickPost() {
        axios.post("http://localhost:3000/todo",{
            title:"kjdbcj",status:"completed"
        })
        .then(function (response) {
            console.log(response);
          })
    }

    function handelClickPut() {
        axios.put("http://localhost:3000/todo/5",{
            title:"helo",
        })
        .then(function (response) {
            console.log(response);
          })
    }




    return (
        <div >
            {todos.map((item) =>
                <p key={item.id}>{item.id}-
                    {item.title}-
                    {item.status} <button onClick={() => handelClickDelete(item.id)}>delete</button>
                </p>
            )}
            <button onClick={handelClickPost}>post</button>
            <button onClick={handelClickPut}>put</button>
        </div>

    )
}


export default TodoJson;