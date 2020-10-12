import React, { useState, useEffect } from 'react';
import './ad.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Summary() {
    const [loading, setLoading] = useState(false);
    const [adData, setAdData] = useState([]);
    const [number, setNumber] = useState(0);
    const [compNumber, setCompNumber] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const todayDate = new Date();



    //get All adverts 
    useEffect(() => {
        setLoading(true)
        try {
            axios
                .get(`http://localhost:5000/advert/getAll`)
                .then(res => {
                    setAdData(res.data);
                })

        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }, [loading])

    //get number of  ads
    useEffect(() => {
        setNumber(adData.length);
    }, [adData])

    //get number of companies that posted ads
    useEffect(() => {
        setLoading(true)
        try {
            axios
                .get(`http://localhost:5000/advert/getAdPostedCompanies`)
                .then(res => {
                    setCompNumber(res.data[0].count)
                })

        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }, [loading])
    //console.log(compNumber);

    const handleDateChange = (date) => {
        setSelectedDate(date)

    }

    let dateData = new Date(selectedDate);
    var day = dateData.getDate();
    var month = 1 + dateData.getMonth();
    var year = dateData.getFullYear();
    var dateAssembled = day + "-" + month + '-' + year



    console.log('deadline is ', dateAssembled);
    const handleDateSubmit = () => {
        try {
            axios
                .post(`http://localhost:5000/advert/requestAdverts`, { date: dateAssembled })
                .then(res => {
                    console.log('data set to', res.data);
                    if (res.data === `error`) {

                        toast.error('error occured while requesting ', { position: toast.POSITION.TOP_RIGHT });
                    } else {
                        toast.success('Change Deadline Successfully ', { position: toast.POSITION.TOP_RIGHT });
                        setShow(false)
                        setSelectedDate('');

                    }
                })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div>
                <ToastContainer newestOnTop={true} />
            </div>
            <Navbar />
            <SideBar />
            <div className="admin-content">


                {/* <div class="container p-3 my-3 bg-light">
                    <div class="form-group row">
                        <div class="col-md-3">
                            <button type="button" class="btn btn-info custom "><Link style={{ color: 'white' }} to="/summary" >SUMMARY</Link></button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-info custom"><Link style={{ color: 'white' }} to="/pending" >PENDING APPROVAL</Link></button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-info custom" ><Link style={{ color: 'white' }} to="/approved" >APPROVED</Link></button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-info custom"><Link style={{ color: 'white' }} to="/declined" >DECLINED</Link></button>
                        </div>
                    </div>
                </div> */}
                <div class="container p-3 my-3 bg-light" >
                    <div class="form-group row">
                        {/* <div class="col-md-2">
                            <Link style={{ color: 'white' }} to="/adHome2" > <button type="button" class="btn btn-info custom ">HOME</button></Link>
                        </div> */}
                        <div class="col-md-2">
                            <Link style={{ color: 'white' }} to="/summary" > <button type="button" class="btn btn-info custom ">SUMMARY</button></Link>
                        </div>
                        <div class="col-md-2">
                            <Link style={{ color: 'white' }} to="/pending" ><button type="button" class="btn btn-info custom">PENDING APPROVAL</button></Link>
                        </div>
                        <div class="col-md-2">
                            <Link style={{ color: 'white' }} to="/approved" > <button type="button" class="btn btn-info custom" >APPROVED</button></Link>
                        </div>
                        <div class="col-md-2">
                            <Link style={{ color: 'white' }} to="/declined" ><button type="button" class="btn btn-info custom">DECLINED</button></Link>
                        </div>
                    </div>
                </div>

                <div className="adverts" >
                    <center>{number} Ads from</center>
                    <center>{compNumber} registered companies </center>
                    <center>have been received</center>
                    <br></br>
                    <button type="button" class="btn btn-info" style={{ background: '#01506e' }} onClick={handleShow}>CHANGE THE DEADLINE</button>

                </div>

                <div>
                    <Modal show={show} onHide={handleClose} dialogClassName='modal-60w' >
                        <Modal.Body>

                            <Form style={{ marginLeft: '10%' }}>
                                <Form.Group >
                                    <Form.Label className="deadline_form_label1">
                                        Change Deadline
                                    </Form.Label>
                                    <div style={{ width: '100%', marginLeft: '21%' }}>
                                        <DatePicker selected={selectedDate} onChange={date => handleDateChange(date)} minDate={todayDate} isClearable dateFormat='yyyy/MM/dd' />
                                    </div>

                                </Form.Group>
                            </Form>
                            <div style={{ marginRight: '40%' }}>
                                <Link style={{ color: 'white' }}
                                    to='/summary'
                                >
                                    <button

                                        className="saveChanges-btn"
                                        style={{ outline: 'none' }}
                                        type="button"
                                        disabled={!selectedDate}
                                        onClick={handleDateSubmit}

                                    >
                                        Save Changes
            </button>
                                </Link>
                            </div>



                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default Summary;