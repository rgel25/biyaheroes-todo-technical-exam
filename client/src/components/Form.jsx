import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";

// FOR BOOTSTRAP FORM VALIDATION
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

// FORMAT DATE AND TIME TIMESTAMP FOR DB CLIENT REQUIREMENTS
const todoDatetimestampFormatter = () => {
  const date = new Date().toISOString().split("T")[0].replace(/[-]/g, "");
  const time = new Date().toLocaleTimeString("da-Danish").replace(/[.]/g, "");
  return +[date, time].join("");
};

// INITIAL FORM DATA
const initialFormData = {
  todoReference: "",
  todoTitle: "",
  todoDescription: "",
  todoDatetimestamp: "",
};

export default function Form({ updateTodos, todosTitle }) {
  // BOOTSTRAP FORM VALIDATION
  React.useEffect(() => {
    initializeValidation();
  }, []);

  // TEMP DATA FROM FRONT END
  //   const [data, setData] = React.useState([]);
  //   FORM DATA STATE
  const [formData, setFormData] = React.useState(initialFormData);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const formChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Clear form validation
    const clearFormValidation = () => {
      const forms = document.querySelectorAll(".needs-validation");
      Array.from(forms).forEach((form) => {
        form.classList.remove("was-validated");
      });
      initializeValidation();
    };
    // Added automated data to formData
    formData.todoReference = nanoid();
    formData.todoDatetimestamp = todoDatetimestampFormatter();

    // VALIDATE UNIQUE TITLE
    if (todosTitle.find((title) => title === formData.todoTitle)) {
      clearFormValidation();
      setError("Todo title already exists!");
      setSuccess("");
      return;
    }

    // SEND HTTP REQUEST
    await axios.post("/api/todos", formData);
    // REFLECT CHANGES ON FRONTEND
    updateTodos();
    // CLEAR FORM AND FEEDBACK MESSAGES
    setFormData(initialFormData);
    clearFormValidation();
    setSuccess("Successfully added todo!");
    setError("");
  };

  return (
    <div>
      <form
        noValidate
        className="needs-validation"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-3 text-start">
          <label htmlFor="title" className="form-label">
            Todo Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            name="todoTitle"
            value={formData.todoTitle}
            onChange={formChangeHandler}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="description" className="form-label">
            Todo Description
          </label>
          <textarea
            className="form-control"
            id="description"
            required
            name="todoDescription"
            value={formData.todoDescription}
            onChange={formChangeHandler}
          />
        </div>
        {success && (
          <div className="d-grid">
            <div
              className="alert alert-primary alert-dismissible fade show"
              role="alert"
            >
              {success}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setSuccess("")}
              ></button>
            </div>
          </div>
        )}
        {error && (
          <div className="d-grid">
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
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
