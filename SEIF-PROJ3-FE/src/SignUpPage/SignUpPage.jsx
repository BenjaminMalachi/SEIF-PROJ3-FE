//TODO: Alex/Fix modal

import { useState } from "react";
import { signUp } from "../service/users";
import { hashData } from "../util/security";

import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal";

export default function SignUpForm() {
  const [formState, setFormState] = useState({});
  const [disable, setDisable] = useState(true);

  //Modal states
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const navigate = useNavigate();

  function handleChange(evt) {
    var currForm = formState;
    currForm[evt.target.id] = evt.target.value;
    setDisable(checkPassword());
    setFormState(currForm);
  }

  // make sure check and password is the same
  function checkPassword() {
    // password validation
    // TODO: to use react form hook
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
      //TODO: Show Success modal. Redirect to login page
      //   setSuccessModal(true);
      navigate("/login");
    } catch (e) {
      console.log(e);
      //TODO: Error modal if not successful
      setErrorModal(true);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
          <h2 className="card-title text-center mb-4">Sign Up</h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label htmlFor="first_name" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="first_name"
                type="text"
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="last_name" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="last_name"
                type="text"
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="confirm" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirm"
                type="password"
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={disable}
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
      {successModal && (
        <Modal
          title="Success"
          message="You have successfully signed up!"
          onDismiss={() => {
            setSuccessModal(false);
            // navigate("/login");
          }}
        />
      )}

      {errorModal && (
        <Modal
          title="Error"
          message="There was an error signing up. Please try again."
          onDismiss={() => {
            setErrorModal(false);
            setFormState({});
          }}
        />
      )}
    </>
  );
}
