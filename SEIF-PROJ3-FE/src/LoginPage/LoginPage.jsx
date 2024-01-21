import { Link } from "react-router-dom";
import { useState } from "react";
import { getLoginDetails, loginUser } from "../service/users";
import { hashDataWithSaltRounds, storeToken } from "../util/security";
import SignUpPage from "../SignUpPage/SignUpPage";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const { setUser } = props;

  const [formState, setFormState] = useState({});
  const navigate = useNavigate();

  function handleChange(evt) {
    var currForm = formState;
    currForm[evt.target.name] = evt.target.value;
    setFormState(currForm);
  }

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      // highlight-start
      const formData = { ...formState };
      delete formData.error;
      delete formData.confirm;
      // highlight-end
      console.log(formData);
      // get user hash password from database
      console.log("Logging in with:", formData.email);
      const loginDetails = await getLoginDetails(formData.email);
      console.log(loginDetails);

      const hashedPassword = hashDataWithSaltRounds(
        formData.password,
        loginDetails.salt,
        loginDetails.iterations
      );
      formData.password = hashedPassword;

      const token = await loginUser(formData);
      // store token in localStorage
      storeToken(token);
      // set user
      setUser(formData.email);
      // redirect to home page
      navigate("/");
      // Baby step!
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
          <div className="p-4">
            <h2 className="card-title text-center mb-4">Welcome to Elysio!</h2>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex flex-col">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-4 justify-left">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  className="px-4 py-2  bg-blue-500 text-white rounded-md"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
