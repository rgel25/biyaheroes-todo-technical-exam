import React from "react";
import EditForm from "./EditForm";
import axios from "axios";

export default function List({ todos, updateTodos }) {
  // DELETE HANDLER FOR TODO DELTION,
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      // DELETE API ENDPOINT REQUEST
      axios.delete(`/api/todos/${id}`);
      // DELETE TODO IN FRONT END
      await updateTodos();
    }
  };

  // Custom date formatter
  const dateFormatter = (date) => {
    const year = date.toString().slice(0, 4);
    const month = date.toString().slice(4, 6);
    const day = date.toString().slice(6, 8);
    const hours = date.toString().slice(8, 10);
    const minutes = date.toString().slice(10, 12);
    const seconds = date.toString().slice(12, 14);
    // YYYYMMDDHHmmss
    return `Created at ${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="list-group">
      {todos.length > 0 ? (
        todos.map((todo, i) => (
          <div className="list-group-item text-start" key={i}>
            <div className="row position-relative">
              <div className="col-10">
                <p className="m-0">{todo.todoTitle}</p>
                <p className="m-0">{todo.todoDescription}</p>
                <p className="m-0 position-absolute bottom-0 fs-6 fw-lighter text-secondary">
                  {dateFormatter(todo.todoDatetimestamp)}
                </p>
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col d-grid">
                    <button
                      className="btn btn-primary btn-sm mb-1"
                      data-bs-toggle="modal"
                      data-bs-target={`#view-modal-${todo._id}`}
                    >
                      View
                    </button>
                  </div>
                  <div className="col d-grid">
                    <button
                      className="btn btn-success btn-sm mb-1"
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${todo._id}`}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-grid">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteHandler(todo._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* MODAL */}
            <div
              className="modal fade"
              id={`modal-${todo._id}`}
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {`Edit Todo #${i + 1}`}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <EditForm
                    todo={todo}
                    updateTodos={updateTodos}
                    todos={todos}
                  />
                </div>
              </div>
            </div>
            {/* END OF MODAL */}
            {/* MODAL */}
            <div
              className="modal fade"
              id={`view-modal-${todo._id}`}
              tabIndex="-1"
              aria-labelledby={`view-modal-${todo._id}-label`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id={`view-modal-${todo._id}-label`}
                    >
                      {`Todo #${i + 1} Details`}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Todo Reference: {todo.todoReference}</p>
                    <p>Todo Datetimestamp: {todo.todoDatetimestamp}</p>
                    <p>Todo Title: {todo.todoTitle}</p>
                    <p>Todo Description: {todo.todoDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* END OF MODAL */}
          </div>
        ))
      ) : (
        <div className="list-group-item">No to do yet...</div>
      )}
    </div>
  );
}
