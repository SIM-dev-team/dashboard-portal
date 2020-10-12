import React, { useState, useEffect } from 'react'
import './ad.css'
import MUIDataTable from 'mui-datatables'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios'



// const Data = [
//   ['testCompany', 't0001', '5', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '4', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0002', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '4', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '1', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
//   ['testCompany', 't0001', '2', '0111223344', 'testmail@test.com'],
// ]


function Declined() {
  const [loading, setLoading] = useState(false);
  const [adData, setAdData] = useState([]);
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const handleClose = () => setShow(false);



  //get all the declined advert data
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`http://localhost:5000/advert/getDeclinedAds`)
        .then(res => {
          setAdData(res.data);
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [loading])

  //get the number of declined adverts
  useEffect(() => {
    setNumber(adData.length)
  }, [adData])

  //handle the view more click
  const handleRowClick = (rowData) => {
    console.log(rowData[1]);
    let key = rowData[1];
    for (var i = 0; i < adData.length; i++) {
      if (key === adData[i].ad_id) {
        setModalData(adData[i]);
      }
    }
    setShow(true);

  }

  const columns = [
    'COMPANY NAME',
    'ADVERT CODE',
    'INTERNSHIP POSITION',
    'NO OF POSITIONS',
    'STATUS',
    {
      Name: 'view more',
      options: {
        customBodyRenderLite: () => {
          return <Button variant="outline-danger" size='sm'>VIEW MORE</Button>
        },
      }

    },
  ]

  let Data = adData
  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
  }
  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="admin-content">

        {/* 
        <div class="container p-3 my-3 bg-light">
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

        <br></br>
        <div class="col-md-12">
          <h6 style={{ marginLeft: '40%' }}>{number} advertisements have been declined</h6>
        </div>
        <br></br>
        <div className='container-fluid'>
          <MUIDataTable
            columns={columns}
            // data={Data}
            data={Data.map(item => {
              return [
                item.comp_name,
                item.ad_id,
                item.internship_position,
                item.no_of_positions,
                item.status
              ]
            })}
            options={{
              options,
              selectableRows: "none",
              viewColumns: false,
              download: false,
              print: false,
              rowsPerPage: 7,
              rowsPerPageOptions: false,
              onRowClick: handleRowClick,
            }}
          />
        </div>
        <br></br>
        <Modal dialogClassName='modal-70w'
          show={show}
          onHide={handleClose} >

          <Modal.Body>
            <container>
              <div className='row'>
                <span className="col-5">
                  <img src={modalData.profile_pic_url} alt='name' style={{ width: '40%', height: '70%', marginLeft: '60%' }} />
                </span>
                <span className="col-6" style={{ marginTop: '3%' }}>
                  <h1>{modalData.comp_name}</h1>
                </span>
              </div>

              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-5'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Company Website</Form.Label>
                    <Form.Control type="text" placeholder={modalData.comp_website} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
                <span className='col-5' >
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Date Created</Form.Label>
                    <Form.Control type="text" placeholder={modalData.date_created} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>

              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-5'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Advert Category</Form.Label>
                    <Form.Control type="text" placeholder={modalData.internship_position} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
                <span className='col-5' >
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Advert Category Code</Form.Label>
                    <Form.Control type="text" placeholder={modalData.cat_id} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-10'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Position Description</Form.Label>
                    <Form.Control type="text" placeholder={modalData.position_desc} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-10'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Job Description</Form.Label>
                    <Form.Control type="text" placeholder={modalData.job_desc} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-10'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Needed Knowledge and Skills </Form.Label>
                    <Form.Control type="text" placeholder={modalData.knowledge_skills} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-10'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Benefits </Form.Label>
                    <Form.Control type="text" placeholder={modalData.benefits} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className='row' style={{ marginLeft: '15%' }}>
                <span className='col-5'>
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Number of Postitions available</Form.Label>
                    <Form.Control type="text" placeholder={modalData.no_of_positions} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
                <span className='col-5' >
                  <Form>
                    <Form.Label style={{ fontSize: 17 }}>Number Of Applicants</Form.Label>
                    <Form.Control type="text" placeholder={modalData.no_of_applicants} disabled style={{ fontSize: 18 }} >
                    </Form.Control>
                  </Form>
                </span>
              </div>
              <div className="col-10" style={{ maxWidth: '70%', maxHeight: '50%', marginLeft: '30%' }}>

                <img src={modalData.attachment_url} alt='name' style={{ width: '50%', height: '50%' }} />
              </div>

            </container>


          </Modal.Body>
        </Modal >
        {/* <div class="form-group row">

          <div class="col-md-8">
            <h8>0/104 selected</h8><br></br>
            <button type="button" >Select All</button>
          </div>



          <div class="col-md-2">
            <button type="button" class="btn btn-info smbtn" style={{ background: '#1a84ad' }}>PUBLISH</button>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-info smbtn" style={{ background: '#d12317' }}>CANCEL</button>
          </div>
        </div> */}


      </div>
    </div>
  )
}

export default Declined;