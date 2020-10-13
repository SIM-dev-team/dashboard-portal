import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios'
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Users() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [pdcData, setPDCData] = useState([]);
    const [modalData, setModalData] = useState({
        user_id: '',
        f_name: '',
        l_name: '',
        email: '',
        user_name: '',
        password: '',
        role: ''


    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    ///function for get user data
    useEffect(() => {
        setLoading(true);

        try {
            axios
                .get('http://localhost:5000/auth/getPDCUsers')
                .then(res => {
                    console.log(res.data);
                    setPDCData(res.data);
                })

        } catch (error) {
            console.log(error);

        }

        setLoading(false)

    }, [loading])

    //handle the form changes
    const handleChange = evt => {
        evt.preventDefault();
        setModalData({ ...modalData, [evt.target.name]: evt.target.value })

    }

    console.log(modalData);



    //function for register the user
    const handleAddUser = evt => {
        evt.preventDefault();
        setIsAdding(true);
        let userData = { newUser: modalData }
        //console.log(userData);
        try {
            axios
                .post(`http://localhost:5000/auth/PDCUserRegister`, userData)
                .then(res => {
                    //console.log(res.data);
                    toast.success('New User Added', { position: toast.POSITION.TOP_RIGHT });
                    console.log("user added");
                    setShow(false);
                    setIsAdding(false)
                    window.location.reload(false);
                })

        } catch (error) {
            toast.error('Error Occured  ', { position: toast.POSITION.TOP_RIGHT });
            console.log(error);

        }



    }
    // const handleConfirmPass = (confirmpass) => {
    //     if (modalData.password === confirmpass) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }

    const columns = ['User Id', 'First Name', 'Last Name', 'Email', 'Role']
    let Data = pdcData;

    return (
        <div>
            <div>
                <ToastContainer newestOnTop={true} />
            </div>
            <div className="admin-content">
                <div className="users">
                    <h1> PDC Users Details</h1>
                    <div className="addbtn">
                        <Button onClick={handleShow}>Add New User</Button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header >
                            <Modal.Title style={{ marginLeft: '30%' }}>Add New User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control type="number" name="user_id" id='user_id' placeholder="Enter User ID" onChange={handleChange} >
                                    </Form.Control>

                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name='f_name' id="f_name" placeholder="Enter First Name" onChange={handleChange} >
                                    </Form.Control>

                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="l_name" id="l_name" placeholder="Enter Last Name" onChange={handleChange} >
                                    </Form.Control>

                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" id="email" placeholder="Enter Email" onChange={handleChange}  >
                                    </Form.Control>
                                    <Form.Label>Roles</Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="mr-sm-2"
                                        id="role"
                                        name="role"
                                        placeholder='Role of User'
                                        custom
                                        onChange={handleChange}
                                    >

                                        <option value="adm">Administrater</option>
                                        <option value="cod">Coordinater</option>
                                        <option value="PA">Project Assistant</option>
                                    </Form.Control>

                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name='user_name' id='user_name' placeholder="Enter Username" onChange={handleChange} >
                                    </Form.Control>

                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name='password' id='password' placeholder="Enter Password" onChange={handleChange} >
                                    </Form.Control>

                                    {/* <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name='password' id='password' placeholder="Enter Password" onChange={(confirmpass) => handleConfirmPass(Confirmpass)} >
                                    </Form.Control> */}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit" onClick={handleAddUser} disabled={!modalData.email ||
                                !modalData.f_name ||
                                !modalData.l_name ||
                                !modalData.password ||
                                modalData.password.length < 8 ||
                                !modalData.user_id ||
                                !modalData.user_name} >
                                Register User
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="container">
                        <MUIDataTable
                            columns={columns}
                            data={Data.map(item => {
                                return [
                                    item.user_id,
                                    item.f_name,
                                    item.l_name,
                                    item.email,
                                    item.role,
                                ]
                            })}
                            options={{
                                selectableRows: "none",
                                download: false,
                                print: false,
                                viewColumns: false,
                                sort: false,
                                pagination: true,
                                rowsPerPage: 5,
                                rowsPerPageOptions: [5, 10, 15, 20],
                            }}
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </div >
    )
}

export default Users;