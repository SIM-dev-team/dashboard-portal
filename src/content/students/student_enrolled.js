import React,{ useState, useEffect } from 'react';
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
    const  [stu_all_data, setAllData] = useState([])
    const  [stu_data,setData ]= useState([])
    
    useEffect(()=>{
        var studentData = new Array()
        axios.get("http://localhost:5000/student/studentcount").then(res => {
             console.log(res)
             const data = res.data
             const stu_obj_array = Object.values(data)
             console.log(stu_obj_array)
             setAllData(stu_obj_array)
             for(let data of stu_obj_array){
                const myData = [data.count]
                console.log(myData)
                studentData.push(myData)
            }
            setData(studentData)
        })
        .catch(err => {
            console.error(err)
        })
        
    },[])
    
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
                <p>{stu_data} Out of 300 Students</p>
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