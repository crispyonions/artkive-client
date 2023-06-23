import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"
import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("lu_token", res.token)
                        navigate("/home")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> first name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> last name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> verify password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> artist bio </label>
                    <textarea ref={bio} name="bio" className="form-control" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                already registered? <Link to="/login">login</Link>
            </section>
        </main>
    )
}
export default Register
