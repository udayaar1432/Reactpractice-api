import { useEffect, useState } from "react"
import axios from "axios"

export default function Todo() {
    const [data, setdata] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
            .then((res) => setdata(res.data))
    }, []);

        

    function handleInputChange(e) {
        setInput(e.target.value)
    }
    function handleChange(e) {
        // return e.target.value
        console.log(e.target.checked);
    }
    function handleDelete(id) {
        const filterTodo = data.filter((x) =>
            x.id !== id);
        setdata(filterTodo)
    }
    function handleSubmit(e) {
        e.preventDefault()  
        const maxId = (Math.max.apply(null, data.map((item) => item.id)))
        const todo = {
            id: maxId + 1,
            title: input,
            completed: false
        }
        setdata([...data, todo]);
        setInput("")
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} >
                    <input type="text" name="additem" onChange={handleInputChange} value={input} />
                    <button>Add</button>
                </form>
            </div>
            {data.map((item) => <div className="itemlist">
                <div className="title">{item.title}</div>
                <input type="checkbox" onChange={handleChange} />
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>)}
        </div>
    )
}
