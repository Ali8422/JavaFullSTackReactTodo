import { useState } from "react";

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditText] = useState("");

  function handleAddTodos() {
    if (text.trim() === "") return;
    const uid = crypto.randomUUID().slice(0, 8);
    const newTodos = [...todos, { id: uid, text, completed: false }];
    setTodos(newTodos);
    setText("");
  }

  function handleEditStart(id, currentText) {
    setEditingId(id);
    setEditText(currentText);
  }

  function handleEditSave(id) {
    if (editingText.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  }
  function handleUpdateTodos(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteTodos(id) {
    setTodos(todos.filter((todo) => todo.id != id));
  }
  return (
    <div className="container bg-light m-4 p-2 rounded-3 ">
      <h1 className="">Todo Component</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write todo..."
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter" && text.trim()) {
            handleAddTodos();
          }
        }}
        className="my-4"
      />
      <button
        onClick={() => handleAddTodos()}
        className="btn btn-outline-dark mx-2"
      >
        Add
      </button>
      <ul className="container ">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="d-flex justify-content-between align-items-center py-2"
          >
            {/* {EDIT MODE} */}
            {editingId === todo.id ? (
              <div>
                <input
                  value={editingText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSave(todo.id);
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditText("");
                    }
                  }}
                  className="form control form control-sm me-2"
                  autoFocus
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  className="btn btn-outline-success btn-sm"
                >
                  ✅
                </button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => handleUpdateTodos(todo.id)}
                  className={`text-black ${
                    todo.completed ? "text-decoration-line-through" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {todo.text}
                </span>
                <div>
                  <button
                    onClick={() => handleEditStart(todo.id, todo.text)}
                    className="btn btn-sm btn-outline-primary me-1"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteTodos(todo.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
