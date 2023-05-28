import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const usernameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const cfPassRef = useRef('')

    const [usernameErr, setUsernameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [cfPassErr, setCfPassErr] = useState('')

    const navigate = useNavigate()

    const registerHandle = (e) => {
        e.preventDefault()
        let username = usernameRef.current.value
        let email = emailRef.current.value
        let password = passwordRef.current.value
        let cfPass = cfPassRef.current.value

        // reset
        setUsernameErr('')
        setEmailErr('')
        setPasswordErr('')
        setCfPassErr('')
        // data validation
        // check empty
        if (username === '') {
            setUsernameErr('Username cannot be empty!')
            return
        } else if (email === '') {
            setEmailErr('Email cannot be empty!')
            return
        } else if (password === '') {
            setPasswordErr('Password cannot be empty!')
            return
        } else if (cfPass === '') {
            setCfPassErr('Confirm password cannot be empty!')
            return
        }
        // console.log(username, email, password, cfPass)
        // check password
        if (password !== cfPass) {
            setCfPassErr('Password not matching!')
            return
        }

        var registerForm = new FormData()
        registerForm.append('username', username)
        registerForm.append('email', email)
        registerForm.append('password', password)

        // add new user
        fetch('http://localhost:9091/server/user-register', {
            method: 'POST',
            body: registerForm
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response === 'Success!') {
                    window.alert('Sign up succesful!')
                    sleep(1000)
                    navigate('/login')
                } else if (data.response === 'User already existed!') {
                    window.alert('Username already existed!')
                } else {
                    window.alert('Internal server error, please try again later')
                }
            })
    }

    useEffect(() => {

    }, [])



    return (
        <div>
            {/* <!-- Pills content --> */}
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
                <div>
                    <div className="card p-4 rounded d-flex justify-content-center" style={{ width: '750px', height: '600px' }}>
                        <h1 className='text-center'>Account Register</h1>

                        <form>
                            {/* <!-- Username input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerUsername">Username</label>
                                <input ref={usernameRef} type="text" id="registerUsername" className="form-control" />
                                <p style={{ color: 'red' }}>{usernameErr}</p>
                            </div>

                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerEmail">Email</label>
                                <input ref={emailRef} type="email" id="registerEmail" className="form-control" />
                                <p style={{ color: 'red' }}>{emailErr}</p>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerPassword">Password</label>
                                <input ref={passwordRef} type="password" id="registerPassword" className="form-control" />
                                <p style={{ color: 'red' }}>{passwordErr}</p>
                            </div>

                            {/* <!-- Repeat Password input --> */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                                <input ref={cfPassRef} type="password" id="registerRepeatPassword" className="form-control" />
                                <p style={{ color: 'red' }}>{cfPassErr}</p>
                            </div>

                            <div className="text-center">
                                {/* <!-- Submit button --> */}
                                <button type="submit" className="btn btn-primary btn-block" onClick={registerHandle}>Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div >
    );
};

export default Register;
