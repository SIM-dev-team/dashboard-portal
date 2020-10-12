import React, { useState, useEffect } from 'react'
import './students.css';
import MUIDataTable from "mui-datatables";
import {Button, Modal, Form, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import { render } from '@testing-library/react';
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import { toast, ToastContainer } from 'react-toastify';

function Confirmed_students(){

    const  [hasError, setErrors] =  useState(false)
    const [isAdding, setIsAdding] = useState(false);
    const  [stu_data,setData ]= useState([])
    const  [stu_all_data, setAllData] = useState([])
    const  [filtered_stu_data, setFilteredData] = useState({})
   
       
      const columns = ["Registration No", "Index No","Student Name",  "Confirmed Company", 
    //   {
    //       name: "",
    //       options: {
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //           return (
    //           <Button size="sm" onClick={() => handleShow_1(tableMeta.rowData[2])}>
    //               {`View more`}
    //           </Button>
    //           );
    //       }
    //       }
    //   }
    
      ]
  
      const options = {
      filterType: 'checkbox',
  
      }
  
      const [validated, setValidated] = useState(false);
  
      
      useEffect(()=>{
          var studentData = new Array()
          //var table_array_data;
          axios.get("http://localhost:5000/student/getInternshipInfo").then(res => {
            //  console.log(res)
              const data = res.data
              const stu_obj_array = Object.values(data)
              // table_array_data = data.table_data
              //console.log(table_array_data)
              console.log(stu_obj_array)
              setAllData(stu_obj_array)
              for(let data of stu_obj_array){
                  const myData = [data.reg_no,data.index_no,data.name,data.comp_name]
                  studentData.push(myData)
              }
              console.log(studentData)
              setData(studentData)
          })
          .catch(err => {
              console.error(err)
          })
          
      },[])

  
      return(
          <div>
              <Navbar />
              <SideBar />
          <div className="admin-content">
             <div className="student">
                 <div className="student_list2 container-fluid">
                      <h1>CONFIRMED STUDENT LIST</h1>
                      <MUIDataTable  
                      data={stu_data} 
                      columns={columns} 
                      options={{options,
                          print : false,
                          download: false,
                      }} 
                      />
  
                 
                  </div>
              </div>
          </div> 
          </div>       
      )
  }
  
  
  export default Confirmed_students
