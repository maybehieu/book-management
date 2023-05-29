import React, { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const Login = () => {
    const usernameRef = useRef('')
    const passwordRef = useRef('')

    const [usernameErr, setUsernameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const { updateLoginStatus, updateAdminStatus, updateActiveUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const loginHandle = (e) => {
        e.preventDefault()
        let username = usernameRef.current.value
        let password = passwordRef.current.value

        if (username === '') {
            setUsernameErr('Username cannot be empty!')
            return
        } else if (password === '') {
            setPasswordErr('Password cannot be empty!')
            return
        }

        var loginForm = new FormData()
        loginForm.append('username', username)
        loginForm.append('password', password)

        fetch('http://localhost:9091/server/user-login', {
            method: 'POST',
            body: loginForm
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response === 'valid0') {
                    console.log(username)
                    navigate('/')
                    // set auth state
                    updateLoginStatus(true)
                    updateAdminStatus(true)
                    updateActiveUser(username)
                } else if (data.response === 'valid1') {
                    console.log(username)
                    navigate('/')
                    updateLoginStatus(true)
                    updateAdminStatus(false)
                    updateActiveUser(username)
                } else if (data.response === 'Wrong password!') {
                    updateLoginStatus(false)
                    updateAdminStatus(false)
                    setPasswordErr('Wrong password!')
                } else if (data.response === 'null') {
                    updateLoginStatus(false)
                    updateAdminStatus(false)
                    setUsernameErr("Username doesn't exist!")
                } else {
                    updateLoginStatus(false)
                    updateAdminStatus(false)
                    window.alert('Internal server error, please try again later')
                }
            })
    }

    useEffect(() => {
        setUsernameErr("")
        setPasswordErr('')
    }, [usernameRef.current, passwordRef.current])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card p-4 rounded d-flex justify-content-center" style={{ width: '600px', height: '400px' }}>
                <form>
                    {/* Email input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        <input ref={usernameRef} type="text" id="form2Example1" className="form-control" />
                        <p style={{ color: 'red' }}>{usernameErr}</p>
                    </div>

                    {/* Password input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        <input ref={passwordRef} type="password" id="form2Example2" className="form-control" />
                        <p style={{ color: 'red' }}>{passwordErr}</p>
                    </div>

                    {/* Submit button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={loginHandle}>Sign in</button>
                    </div>

                    {/* Register buttons */}
                    <div className="text-center">
                        <p>Not a member? <a href="http://localhost:3000/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login