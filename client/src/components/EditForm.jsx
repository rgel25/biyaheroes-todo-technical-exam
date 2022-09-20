import axios from "axios";
import React from "react";

const initializeValidation = () => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};

export default function EditForm({ todo, editTodoHandler, todos }) {
  // FORM VALIDATION
  React.useEffect(() => {
    initializeValidation();
  }, []);

  const [editFormData, setEditFormData] = React.useState({
    _id: todo._id,
    todoTitle: todo.todoTitle,
    todoDescription: todo.todoDescription,
    todoDatetimestamp: todo.todoDatetimestamp,
    todoReference: todo.todoReference,
  });
  const [error, setError] = React.useState("");

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevEditFormData) => ({
      ...prevEditFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (id) => {
    // VALIDATE UNIQUE TITLE
    if (
      todos
        .filter((todo) => todo._id !== id)
        .map((todo) => todo.todoTitle)
        .find((title) => title === editFormData.todoTitle)
    ) {
      const forms = document.querySelectorAll(".needs-validation");
      Array.from(forms).forEach((form) => {
        form.classList.remove("was-validated");
      });
      initializeValidation();
      setError("Todo title already exists!");
      return;
    }
    // PUT
    await axios.put(`/api/todos/${id}/edit`, editFormData);
    // SET STATE IN APP
    // CLEANUP
    editTodoHandler(id, editFormData);
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.classList.remove("was-validated");
    });
    initializeValidation();

    const modal = document.getElementById(`modal-${id}`);
    modal.classList.remove("show");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
  };

  return (
    <>
      <div className="modal-body">
        <form
          noValidate
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            formSubmitHandler(todo._id);
          }}
        >
          <div className="mb-3">
            <label htmlFor="todoTitle" className="form-label">
              Todo Title
            </label>
            <input
              type="text"
              className="form-control"
              id="todoTitle"
              required
              name="todoTitle"
              value={editFormData.todoTitle}
              onChange={formChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="todoDescription" className="form-label">
              Todo Description
            </label>
            <textarea
              className="form-control"
              id="todoDescription"
              required
              name="todoDescription"
              value={editFormData.todoDescription}
              onChange={formChangeHandler}
            />
          </div>

          <div className="modal-footer row">
            {error && (
              <div className="row">
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setError("")}
                  ></button>
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
