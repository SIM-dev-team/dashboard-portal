import React from 'react';
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import './students.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form
  } from 'reactstrap';
  import { Link } from 'react-router-dom'

function Student_enrolling(){
    
    return (
        <div>
        <Navbar />
        <SideBar />
        
        <div className="admin-content">
           <div className="student_enrolling">
            <p className="para">PDC has not enrolled</p>
            <p> students yet.</p>
            <Link to='/student_csv' style={{width: "40%"}}><Button className="enroll" style={{padding:'15px',}}>ENROLL STUDENTS </Button></Link>
           </div>
          
        </div>
        </div>
    )
}

export default Student_enrolling;