import "./App.css";
import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import axios from "axios";

function App() {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/todos");
      setTodos(data);
    };
    fetchData();
  }, []);

  const addTodoHandler = (formData) => {
    setTodos((prevEntries) => [...prevEntries, formData]);
  };

  const editTodoHandler = (id, entry) => {
    setTodos((prevEntries) => {
      const index = prevEntries.findIndex((entry) => entry._id === id);
      const cloneTodos = [...prevEntries];
      cloneTodos[index] = entry;
      return cloneTodos;
    });
  };

  const deleteTodoHandler = (id) => {
    setTodos((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
  };

  return (
    <div className="App">
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Add Todo</h2>
            <Form
              addTodoHandler={addTodoHandler}
              todosTitle={todos.map((todo) => todo.todoTitle)}
            />
          </div>
          <div className="col-12 col-md-6">
            <h2>Your Todo List</h2>
            <List
              todos={todos}
              editTodoHandler={editTodoHandler}
              deleteTodoHandler={deleteTodoHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
