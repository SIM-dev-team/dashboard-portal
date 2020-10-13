import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import auth from '../auth';
import Navbar from '../components/navbar'


const initialValues = {
    email: '',
    password: ''
}


const onSubmit = values => {
    console.log(values);
}

const validate = values => {
    let errors = {};
    if (!values.email) {
        errors.email = 'User Name is required'
        // eslint-disable-next-line no-useless-escape
    } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(values.email)) {
        errors.email = 'invalid email format'
    }

    if (!values.password) {
        errors.password = 'password is required'
    }

    return errors;
}



function Login() {
    // const [user, setUser] = useState()
    const formik = useFormik({ initialValues, onSubmit, validate });
    const history = useHistory();

    const [error, setError] = useState(null);

    const submitData = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/auth/UserLogin`, formik.values)
            .then(res => {
                if (res.data === 'no user data found') {
                    setError('no user data found')
                } else if (res.data === 'incorrect password') {
                    setError('incorrect password')
                } else if (res.data === 'not verified') {
                    setError('not verified account')
                }
                else {
                    auth.setAuthenticatedTrue(res.data);
                    console.log("res data :" + res.data);
                    history.push('/registeredcom');
                }

            })
            .catch(err => {
                setError('something went wrong')
                console.log(err.data);
            });
    }
    return (
        <React.Fragment>
            <Navbar />
            <div className="login-page">
                <div className="login-form">
                    <div className="login-header">Login</div>
                    <div className="login-container">
                        <Form onSubmit={submitData}>
                            <Form.Group>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter User Name"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && formik.touched.email ? <small className='text-danger'>{formik.errors.email}</small> : ''}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} />
                                {formik.errors.password && formik.touched.password ? <small className='text-danger'>{formik.errors.password}</small> : ''}
                            </Form.Group>
                            <Form.Group>
                                <small className="text-danger">{error}</small>
                            </Form.Group>
                            {/* <Form.Group style={{ float: 'right' }}>
                                <Link to="/forgotPassword">forgot password</Link>
                            </Form.Group> */}
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ marginBottom: '20px', padding: '3px 30px' }}
                                disabled={
                                    formik.errors.email ||
                                    formik.errors.password ||
                                    !formik.touched.email ||
                                    !formik.touched.password
                                }>
                                Login
                    </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Login;