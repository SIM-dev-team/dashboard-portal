import React, { useState, useEffect } from 'react'
import './students.css';
import MUIDataTable from "mui-datatables";
import {Button, Modal, Form, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { render } from '@testing-library/react';
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import { toast, ToastContainer } from 'react-toastify';

//update - axios.put(http://localhost:5000/student/addNewStudent/update)

function Student_list2() {

  const  [hasError, setErrors] =  useState(false)
  const [isAdding, setIsAdding] = useState(false);
  const  [stu_data,setData ]= useState([])
  const  [stu_all_data, setAllData] = useState([])
  const  [filtered_stu_data, setFilteredData] = useState({})

  const [show_1, setShow_1] = useState(false);
  const [show_2, setShow_2] = useState(false);

  const handleClose_1 = () => setShow_1(false);
  const handleClose_2 = () => setShow_2(false);

  const handleShow_1 = (index) => {
      setShow_1(true);
      console.log(index)
      console.log(stu_all_data)
      const filtered_data = stu_all_data.filter(x => x.index_no === index);
      console.log(filtered_data[0])
      setFilteredData(filtered_data[0])
  };
  const handleShow_2 = () => setShow_2(true);

  const [modalData, setModalData] = useState({
    name: '',
    regno: '',
    indexno: '',
    degree: '',
    email: '',
    contact: '',
    gpa: '',


});
    const [modalData_1, setModalData_1] = useState({
        name: '',
        reg_no: '',
        index_no: '',
        course: '',
        email: '',
        contact: '',
        gpa: '',


    });

const handleChange = evt => {
    evt.preventDefault();
    setModalData({ ...modalData, [evt.target.name]: evt.target.value })

}
const handleChange_1 = evt => {
    evt.preventDefault();
    setModalData_1({ ...modalData_1, [evt.target.name]: evt.target.value })

}

const handleAddStudent = evt => {
    evt.preventDefault();
    setIsAdding(true);
    let studentData = { newStudent: modalData }
     console.log(studentData);
    try {
        axios
            .post(`http://localhost:5000/student/addNewStudent`, studentData)
            .then(res => {
                //console.log(res.data);
                toast.success('New Student Added', { position: toast.POSITION.TOP_RIGHT });
                console.log("student added");
                setShow_2(false);
                setIsAdding(false);
                window.location.replace('/student_list2')
            })

    } catch (error) {
        toast.error('Error Occured  ', { position: toast.POSITION.TOP_RIGHT });
        console.log(error);

    }



}


    const columns = ["Student Name", "Registration No", "Index No", "Course" , "Email" , 
    {
        name: "",
        options: {
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
            <Button size="sm" onClick={() => handleShow_1(tableMeta.rowData[2])}>
                {`View more`}
            </Button>
            );
        }
        }
    }
    ]

    // const data = [
    // ["Joe James", "2017cs005", "17000051", "CS" , "thirunihp@gmail.com" , ""],
    // ["John Walsh", "2017cs005", "17000051", "CS" , "thirunihp@gmail.com" , ""],
    // ["Bob Herm", "2017cs005", "17000051", "CS" , "thirunihp@gmail.com" , ""],
    // ["James Houston", "2017cs005", "17000051", "IS" , "thirunihp@gmail.com" , ""]

    // ]

    const options = {
    filterType: 'checkbox',

    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } 
        alert(event.target.name.value)
        setValidated(true);
        //setIsAdding(true);
        let updateStudentData = { updateStudent: modalData_1 }
        console.log(updateStudentData);
        // if(validated) {
        //     const options = {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body:  JSON.stringify(form.value)
        //     }
        //     fetch("http://localhost:5000/student/update", options).then(async res => {
        //         const data = await res.json();
        //         console.log(data.message)
        //         /** Navigate to the dashboard */
        //         window.open('/dashboard')
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // }
    };
   // var stu_obj_array
    useEffect(()=>{
        var studentData = new Array()
        var table_array_data;
        axios.get("http://localhost:5000/student/getAll").then(res => {
            console.log(res)
            const data = res.data
            const stu_obj_array = data.data
            // table_array_data = data.table_data
            //console.log(table_array_data)
            console.log(stu_obj_array)
            setAllData(stu_obj_array)
            for(let data of stu_obj_array){
                const myData = [data.name,data.reg_no,data.index_no,data.course===1?"Computer Science":"Information Systems",data.email,""]
                studentData.push(myData)
            }
            console.log(studentData)
            setData(studentData)
        })
        .catch(err => {
            console.error(err)
        })
        
    },[])

    // fetch("http://localhost:5000/student/getAll").then(async res=>{
    //     const data = await res.json()
    //     const stu_obj_array = data.data
    //     // const table_array_data = data.table_data
    //     // console.log(table_array_data)
    //     // console.log(stu_obj_array)
    //     // setAllData(stu_obj_array)
    //     // setData(table_array_data)
    //   //  console.log(studentData)
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
    function cancel(){
        window.location.replace('/student_list2')
    }

    return(
        <div>
            <Navbar />
            <SideBar />
        <div className="admin-content">
           <div className="student">
               <div className="student_list2 container-fluid">
                    <h1>REGISTERED STUDENT LIST</h1>
                    <MUIDataTable  
                    data={stu_data} 
                    columns={columns} 
                    options={{options,
                        print : false,
                        download: false,
                        selectableRows:false,
                    }} 
                    />

                <div>
                    
                    <Modal show={show_1} onHide={handleClose_1} size="lg">
                        <Modal.Header closeButton style={{}} >
                        <Modal.Title style={{ marginLeft: '28%', fontSize: 24, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#6e6b6b' }}>Student Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color:'#616161' }}>
                                Student Name : 
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control  defaultValue={filtered_stu_data.name} onChange={handleChange_1} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="reg_no">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Registration No :
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control  defaultValue={filtered_stu_data.reg_no} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="index_no">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Index No :
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control defaultValue={filtered_stu_data.index_no} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="course">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Degree Programme :
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control defaultValue={filtered_stu_data.course===1?"Computer Science":"Information Systems"} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="email">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Email :
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control defaultValue={filtered_stu_data.email} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} controlId="contact">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Contact No:
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control defaultValue={filtered_stu_data.contact} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="gpa">
                                <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                Current GPA:
                                </Form.Label>
                                <Col sm="9">
                                <Form.Control  defaultValue={filtered_stu_data.current_gpa} onChange={handleChange_1}/>
                                </Col>
                            </Form.Group>
                            <Button style={{float:"right"}} variant="primary" onClick={handleSubmit}>Update & Save</Button>
                        </Form>
                        </Modal.Body>
                        {/* <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose_1}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>Update & Save</Button>
                            </Modal.Footer> */}

                    </Modal>

                </div>

                <div className="row">
                  <div className="col-7"></div>
                    <div className="btn_set col-5">    
                        <button className="btn cancelbtn btn-danger clearfix float-right" style={{ width: '200px', marginRight: '2em' }}onClick={()=> cancel()}>Cancel</button>  
                        <button className="btn enrollbtn btn-primary clearfix float-right"  style={{ width: '200px' }} onClick={handleShow_2}>Add new Student</button>
                        
                        <Modal show={show_2} onHide={handleClose_2} size="lg">
                            
                            <Modal.Header closeButton style={{}} >
                            <Modal.Title style={{ marginLeft: '35%', fontSize: 24, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#6e6b6b' }}>Add New Student</Modal.Title>
                            </Modal.Header>
                           
                            <Modal.Body>
                              <Form onSubmit={handleAddStudent} >

                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Name With Initials : 
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control type="text" name="name" id="name" required placeholder="Amanda R.P.T." onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide the student name.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>
                                
                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Registration No :
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control type="text" name="regno" id="regno"  required placeholder="2017cs001" onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide the Registration Number.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Index No :
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control name="indexno" id="indexno" required  placeholder="17000001" onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide the Index Number.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Degree Programme:
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control name="degree" id="degree" required as="select"  onChange={handleChange}>
                                        <option>Computer Science</option>
                                        <option>Information Systems</option>
                                    </Form.Control>
                                    {/* <Form.Control.Feedback type="invalid"> Please select the Degree Programme.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Email :
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control name="email" id="email" required type="email" placeholder="abc@gmail.com" onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide a valid email.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Contact No:
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control name="contact" id="contact" required placeholder="Mobile Number" onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide the Contact Number.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} >
                                    <Form.Label column sm="3" style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'TimesNewRoman', color: '#616161' }}>
                                    Current GPA :
                                    </Form.Label>
                                    <Col sm="9">
                                    <Form.Control name="gpa" id="gpa" required type="text" placeholder="GPA" onChange={handleChange} />
                                    {/* <Form.Control.Feedback type="invalid"> Please provide the Current GPA.</Form.Control.Feedback> */}
                                    </Col>
                                </Form.Group>

                                <Modal.Footer>
                                    <Button type="submit" onClick={handleAddStudent} disabled={
                                    !modalData.name ||
                                    !modalData.regno ||
                                    !modalData.indexno ||
                                    !modalData.degree ||
                                    !modalData.email ||
                                    !modalData.gpa ||
                                    !modalData.contact} >
                                        Add Student</Button>
                                    <Button variant="secondary" onClick={handleClose_2}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                                
                            </Form>
                            </Modal.Body>
                            {/* <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose_2}>
                                    Close
                                </Button>
                                <Button variant="primary">Submit</Button>
                            </Modal.Footer> */}

                        </Modal>
                                    
                    </div>
                  </div>
                </div>
            </div>
        </div> 
        </div>       
    )
}


export default Student_list2