import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { setUserData } from "../../Redux/userSlice";
import styles from "./Home.module.css";
import { apiURLLocal } from "../../Variables/const";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function updateUserData(data) {
    dispatch(setUserData(data));
  }

  useEffect(() => {
    if (currentUser) {
      axios
        .get(apiURLLocal, {
          params: {
            email: currentUser.email,
          },
        })
        .then(async function (response) {
          // handle success
          console.log(response);
          await updateUserData(response.data);
          navigate("/dashboard");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [currentUser]);

  function handleChange(event) {
    if (event.target.name === "email") {
      setEmail(event.target.value);
      console.log(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
      console.log(password);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      setError("Failed to log in");
    }
  }

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.banner}>
        <h1>
          Organic
          <br /> Mind
        </h1>
        <img
          src="https://assets.api.uizard.io/api/cdn/stream/e99e168f-d429-4983-8089-5b67c2cb03be.png"
          alt="banner"
        />
      </div>
      <div className={styles.login}>
        <div className={styles.loginWrapper}>
          <h1 style={{ marginBottom: "25px" }}>Sign in</h1>
          <form className={styles.signUpForm} onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => handleChange(event)}
              />
            </div>
            {error && error}
            <button className={styles.signInButton} type="submit">
              Sign In
            </button>
            <Link to={"/sign-up"}>Need to create an account? Sign up</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
