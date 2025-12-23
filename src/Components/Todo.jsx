import { useState } from "react"

export default function Todo(){
    const [text, setText] = useState("");
    const [todos,setTodos] = useState([]);
    
    function handleAddTodos(){
        if(text.trim() === "") return;
        const uid = crypto.randomUUID().slice(0,8);
        const newTodos = [...todos, {id:uid ,text}];
        setTodos(newTodos);
        setText("");
    }

    function handleUpdateTodos(){

    }
    function handleDeleteTodos(index){
        todos.splice(index,1);
        setTodos([...todos]);
    }
    console.log(todos);
    return(
        <div className="container bg-light m-4 p-2 rounded-3 ">
            <h1>Todo Component</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="write todo..." type="text" className="my-4"  />
            <button onClick={() => handleAddTodos()} className="btn btn-outline-dark mx-2">Add</button>
           <ul className="container ">
            {todos.map((todo,i) => 
            <li key={todo.id} className="d-flex justify-content-between align-items-center py-2" > 
                <span className="text-black">{todo.text}</span>
                <button onClick={() => handleDeleteTodos(i)} className="btn btn-sm btn-outline-danger">❌</button>
            </li> )}
           </ul>
        </div>
    )
}