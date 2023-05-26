import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const

    const navigate = useNavigate()

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card p-4 rounded d-flex justify-content-center" style={{ width: '600px', height: '400px' }}>
                <form>
                    {/* Email input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        <input type="email" id="form2Example1" className="form-control" />
                        <p>Err</p>
                    </div>

                    {/* Password input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        <input type="password" id="form2Example2" className="form-control" />
                        <p>Err</p>
                    </div>

                    {/* Submit button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </div>

                    {/* Register buttons */}
                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
