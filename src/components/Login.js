import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"
import "./Auth.css"

const Login = () => {
  const username = useRef();
  const password = useRef();
  const invalidDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value
    };
    loginUser(user)
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("lu_token", res.token);
          navigate("/home");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div>username or password was not valid.</div>
        <button className="button--close" onClick={(e) => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>artkive</h1>
          <h2>your place of reference</h2>
          <fieldset>
            <label htmlFor="inputUsername">username</label>
            <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> password </label>
            <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
          </fieldset>
          <fieldset style={{ textAlign: "center" }}>
            <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};

export default Login
