import React from 'react';
import Navbar from '../../components/navbar';
import SideBar from '../../components/sidebar';
import './students.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import arrow from '../../assets/images/arrow.png';
// import CSVReader from "react-csv-reader";
import { CSVReader, readString } from 'react-papaparse';
import {Tabs, Tab} from 'react-bootstrap';
import { Link } from 'react-router-dom'


function Student_csv(){

    var fileData;
    const handleOnDrop = (data) => {
        console.log(data)
        fileData = data
      }
     
    const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
      }
     
    const handleOnRemoveFile = (data) => {
        
        console.log(data)
        
    }

    function saveFile(){
       // console.log(fileData)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify(fileData)
        }
        fetch("http://localhost:5000/student/add", options).then(async res => {
            const data = await res.json();
            console.log(data.message)
            /** Navigate to the dashboard */
            window.location.replace('/student_list2')
            //window.open('/student_list2')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div>
            <Navbar />
            <SideBar />
       
        <div className="admin-content">
            
           <div className="file container">
               {/* <div className="file_upload">
                    <div className="fu-content-wrapper">
                        <div className="fu-empty-container">
                        <div className="upload-arrow"><img className="imge" src={arrow}></img></div>
                            <div className="upload-msg">
                                You can drag and drop csv file here.
                                <br/>     
                            </div>
                        </div>
                    </div>
                    <br></br>
                    
                    
               </div>
               <div className="row">
                            <div className="col-xl-8 col-lg-6 col-md-4"></div>
                            <div className="buttons col-xl-4 col-lg-6 col-md-8">
                                <Button className="upload">Upload</Button>
                                <Button className="cancel">Cancel</Button>
                            </div>
                </div> */}
                <div className="right" style={{float:"right", marginRight:"20px"}}>
                <Link style={{ color: "white" }} to="/student_list2">  <button className="view_students" style={{ outline: 'none' }}>
                    View Enrolled Students </button>
                </Link>
                </div>
                <br></br>
                <br></br>
               
                <Tabs defaultActiveKey="cs" id="controlled-tab-example">
                    <Tab eventKey="cs" title="Computer Science">
                        <div className="files container">
                            <CSVReader 
                                // inputId ="csv_reader_cs" 
                                // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)} 
                                // inputStyle={{color: 'red'}}
                                onDrop={handleOnDrop}
                                onError={handleOnError}
                                addRemoveButton
                                removeButtonColor='#659cef'
                                onRemoveFile={handleOnRemoveFile}
                                
                                style={{
                                    dropArea: {
                                      borderStyle: 'dashed',
                                      borderRadius: 2,
                                      borderWidth: 2,
                                      marginRight : 0,
                                      marginTop : 20,
                                      height : 180,
                                    },
                                    dropFile: {
                                      width: 150,
                                      height: 150,
                                      progressBar: {
                                        marginTop : 5,
                                      }
                                    },
                                }}
                            
                                >
                                <span>Drop CSV file here or click to upload.</span>
                            </CSVReader>
                        </div>
                        <div className="row">
                            <div className="col-xl-7 col-lg-6 col-md-4"></div>
                            <div className="buttons col-xl-5 col-lg-6 col-md-8">
                            <button className="btn upload btn-primary" style={{ width: '180px', marginRight: '2em' }} onClick={()=> saveFile()}>Save</button>  
                            <button className="btn cancel btn-danger"  style={{ width: '180px' }}>Cancel</button>
        
                            </div>
                        </div>
                    </Tab>
                    
                    <Tab eventKey="is" title="Information Systems">
                        <div className="files container">
                                <CSVReader 
                                    // inputId ="csv_reader_is" 
                                    // onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)} 
                                    // inputStyle={{color: 'red'}}
                                    onDrop={handleOnDrop}
                                    onError={handleOnError}
                                    addRemoveButton
                                    removeButtonColor='#659cef'
                                    onRemoveFile={handleOnRemoveFile}
                                    style={{
                                        dropArea: {
                                        borderStyle: 'dashed',
                                        borderRadius: 2,
                                        borderWidth: 2,
                                        marginRight : 0,
                                        marginTop : 20,
                                        height : 180,
                                        },
                                        dropFile: {
                                        width: 150,
                                        height: 150,
                                        progressBar: {
                                            marginTop : 5,
                                        }
                                        },
                                    }}
                                    >
                                    <span>Drop CSV file here or click to upload.</span>
                                </CSVReader>
                        </div>
                        <div className="row">
                            <div className="col-xl-7 col-lg-6 col-md-4"></div>
                            <div className="buttons col-xl-5 col-lg-6 col-md-8">
                            <button className="btn upload btn-primary" style={{ width: '180px', marginRight: '2em' }}>Save</button>  
                            <button className="btn cancel btn-danger"  style={{ width: '180px' }}>Cancel</button>
                            </div>
                        </div>
                    </Tab>
                    
                </Tabs>
                
            </div>
            
        
        </div>   
        </div>
    )
}



export default Student_csv;