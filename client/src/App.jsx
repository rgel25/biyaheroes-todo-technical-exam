import "./App.css";
import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import axios from "axios";

function App() {
  // Initiate todos as state
  const [todos, setTodos] = React.useState([]);
  // Initiate loading state
  const [loading, setLoading] = React.useState(false);
  // Fetch todos from DB
  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get("/api/todos");
      setTodos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateTodos = async () => {
    setLoading(true);
    // Update todos from DB
    const { data } = await axios.get("/api/todos");
    setTodos(data);
    setLoading(false);
  };

  // DELETE HANDLER FOR TODO DELTION,
  const deleteAllHandler = async () => {
    if (window.confirm("Are you sure you want to delete ALL todos?")) {
      // DELETE API ENDPOINT REQUEST
      await axios.delete(`/api/todos/`);
      // DELETE TODO IN FRONT END
      updateTodos();
    }
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
            <div className="row">
              <div className="col-8">
                <h2>Your Todo List</h2>
              </div>
              <div className="col-4 text-end">
                <button
                  className="btn btn-secondary"
                  onClick={deleteAllHandler}
                >
                  Clear all
                </button>
              </div>
            </div>
            {loading ? (
              <div className="container w-100 text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <List todos={todos} updateTodos={updateTodos} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
