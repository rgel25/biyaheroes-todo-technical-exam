import "./App.css";
import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import axios from "axios";

function App() {
  // Initiate todos as state
  const [todos, setTodos] = React.useState([]);
  // Fetch todos from DB
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/todos");
      setTodos(data);
    };
    fetchData();
  }, []);

  const updateTodos = async () => {
    // Update todos from DB
    const { data } = await axios.get("/api/todos");
    setTodos(data);
  };

  return (
    <div className="App">
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Add Todo</h2>
            <Form
              updateTodos={updateTodos}
              todosTitle={todos.map((todo) => todo.todoTitle)}
            />
          </div>
          <div className="col-12 col-md-6">
            <h2>Your Todo List</h2>
            <List todos={todos} updateTodos={updateTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
