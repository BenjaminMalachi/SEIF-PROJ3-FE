import { useState } from "react";
import { signUp } from "../service/users";
import { hashData } from "../util/security";

export default function SignUpForm() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
  });

  const [disable, setDisable] = useState(true);

  function handleChange(evt) {
    var currForm = formState;
    currForm[evt.target.name] = evt.target.value;
    setDisable(checkPassword());
    setFormState(currForm);
  }

  // make sure check and password is the same
  function checkPassword() {
    // password validation
    // must have at least 1 uppercase, 1 lowercase, 1 special
    var currForm = formState;
    if (!currForm.password) {
      return true;
    }
    if (!currForm.confirm) {
      return true;
    }
    if (currForm.password !== currForm.confirm) {
      console.log(currForm.password);
      console.log(currForm.confirm);
      return true;
    }
    return false;
  }

  function hashPassword() {
    var currForm = formState;
    if (currForm.password) {
      console.log(currForm.password);
      var hash = hashData(currForm.password);
      currForm.password = hash.hash;
      currForm.salt = hash.salt;
      currForm.iterations = hash.iterations;
    }
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      hashPassword();
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;
      // highlight-end
      console.log(formData);
      const user = await signUp(formData);
      // Baby step!
      console.log(user);

      // Reset form errors if sign up is successful
      setFormErrors({ username: "", email: "" });
    } catch (e) {
      console.log(e);

      // Assuming the error object has a response field with the server's response
      if (e.response && e.response.data) {
        const errors = e.response.data;
        // Update formErrors with the server's response
        setFormErrors({
          ...formErrors,
          username: errors.username || "",
          email: errors.email || "",
        });
      }
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="first_name"
            name="first_name"
            onChange={handleChange}
            required
          />
          <label>Last Name</label>
          <input
            type="last_name"
            name="last_name"
            onChange={handleChange}
            required
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
          {formErrors.username && (
            <p className="error">{formErrors.username}</p>
          )}
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;</p>
    </div>
  );
}
// hello world
