import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";

import { toast } from "react-toastify";
import { useGlobalContext } from "../Functions/Context";
import { auth } from "../Utils/Firebase";
import AuthNav from "./AuthNav";

const initialState = {
  firstName: "",
  lastName: "",

  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const { navigate } = useGlobalContext();

  const [state, setstate] = useState(initialState);
  const [signUp, setsignUp] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;

  function handleChange(e) {
    setstate({ ...state, [e.target.name]: e.target.value });
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/");
        return toast("You've successfully Signed In");
      } else {
        return toast.error("All fields must be filled");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        navigate("/");
        return toast("You've successfully Signed Up");
      } else {
        return toast.error("All fields must be filled");
      }
    }
  };

  return (
    <div>
      <AuthNav />
      <div className="authBody">
        <div className="authform">
          <form onSubmit={handleAuth}>
            <div className="authTitle">
              <h3>{!signUp ? "Sign In" : "Sign Up"}</h3>
            </div>

            {signUp && (
              <>
                <input
                  type="text"
                  onChange={handleChange}
                  value={firstName}
                  required
                  minLength={4}
                  placeholder="FirstName"
                  name="firstName"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={lastName}
                  required
                  minLength={4}
                  placeholder="LastName"
                  name="lastName"
                />
              </>
            )}

            <input
              type="email"
              onChange={handleChange}
              value={email}
              required
              minLength={4}
              placeholder="Email"
              name="email"
            />
            <input
              type="password"
              onChange={handleChange}
              value={password}
              required
              minLength={4}
              placeholder="Password"
              name="password"
            />
            {signUp && (
              <>
                <input
                  type="password"
                  onChange={handleChange}
                  value={confirmPassword}
                  required
                  minLength={4}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
              </>
            )}

            <button>{!signUp ? "Sign In" : "Sign Up"}</button>
          </form>

          <div className="dhac">
            {!signUp ? (
              <h6>
                Don't have an account?{" "}
                <span onClick={() => setsignUp(true)}>Sign Up</span>
              </h6>
            ) : (
              <h6>
                Already have an account?{" "}
                <span onClick={() => setsignUp(false)}>Sign In</span>
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
