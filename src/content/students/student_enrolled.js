import React from 'react';
import './students.css'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import { Link } from 'react-router-dom'
import axios from 'axios';
import { render } from '@testing-library/react';
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';


function Student_enrolled(){
    
    return (
        <div>
            <Navbar />
            <SideBar />
        <div className="admin-content">
           <div className="student_enrolled">
               <div className="row">
               <div className="col-3"></div>
                    <div className="left col-3" style={{float:"left", paddingTop:"3rem"}}>
                        <Link style={{ color: "white",float:"right"}} to="/student_list2">  <button className="view_students" style={{ outline: 'none' }}>
                            Registered Students </button>
                        </Link>
                    </div>
                    
                    <div className="right col-3" style={{float:"right", paddingTop:"3rem"}}>
                        <Link style={{ color: "white",float:"left"}} to="/confirmed_students">  <button className="view_students" style={{ outline: 'none' }}>
                            View Confirmed Students </button>
                        </Link>
                    </div>
                    <div className="col-3"></div>
                </div>
            <div className="para">
            {/* <div className="para"> */}
                <p>300 Out of 300 Students</p>
                <p> have been enrolled.</p>
            {/* </div> */}
            {/* <Button className="enroll" style={{padding:'15px',}}>ENROLL STUDENTS</Button> */}
            <Link to='/student_csv' style={{width: "40%"}}><Button className="enroll" style={{padding:'15px',}}>ENROLL STUDENTS </Button></Link>
           </div>
           </div>
        </div>
        </div>
    )
}

export default Student_enrolled;