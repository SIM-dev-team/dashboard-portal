import React, { useState, useEffect } from 'react'
import './ad.css'
import MUIDataTable from 'mui-datatables'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import { Modal, Button, Spinner, Form } from 'react-bootstrap'
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


function Approved() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [approvedAds, setApprovedAds] = useState([]);
  const [approveAdsNumber, setApprovedAdsNumber] = useState(0);
  const [modalData, setModalData] = useState([]);
  const handleClose = () => setShow(false);


  //get all approved adverts
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`http://localhost:5000/advert/getApprovedAds`)
        .then(res => {
          console.log(res.data);
          setApprovedAds(res.data);
        })


    } catch (error) {
      console.log(error);
    }

  }, [loading])

  //get number of approved adverts

  useEffect(() => {
    setApprovedAdsNumber(approvedAds.length);

  }, [approvedAds])


  //handle the view more click
  const handleRowClick = (rowData) => {
    console.log(rowData[1]);
    let key = rowData[1];
    for (var i = 0; i < approvedAds.length; i++) {
      if (key === approvedAds[i].ad_id) {
        setModalData(approvedAds[i]);
      }
    }
    setShow(true);

  }

  console.log(modalData);


  const columns = [
    'COMPANY NAME',
    'ADVERT CODE',
    'INTERNSHIP POSITION',
    'NO OF POSITIONS',
    // 'CONTACT',
    // 'EMAIL',
    'NO OF APPLICANTS',
    'WEBSITE',

    // {
    //   Name: "",
    //   customBodyRenderLite: (dataIndex) => {
    //     return <button className="btn btn-primary">VIEW MORE</button>
    //   },
    // },
    {
      Name: '',
      options: {
        customBodyRenderLite: () => {
          return <Button variant="outline-success" size='sm'>{`View More`}</Button>
        }
      }

    },


  ]

  const options = {
    //filterType: 'checkbox',
    responsive: 'vertical',
  }

  let Data = approvedAds;

  return (
    <div>
      <div>
        <Navbar />
        <SideBar />
        <div className="admin-content">
          <div class="container p-3 my-3 bg-light">
            <div class="form-group row">
              {/* <div class="col-md-3">
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
            </div> */}
              
              <div class="col-md-3">
                <Link style={{ color: 'white' }} to="/summary" > <button type="button" class="btn btn-info custom ">SUMMARY</button></Link>
              </div>
              <div class="col-md-3">
                <Link style={{ color: 'white' }} to="/pending" ><button type="button" class="btn btn-info custom">PENDING APPROVAL</button></Link>
              </div>
              <div class="col-md-3">
                <Link style={{ color: 'white' }} to="/approved" > <button type="button" class="btn btn-info custom" >APPROVED</button></Link>
              </div>
              <div class="col-md-3">
                <Link style={{ color: 'white' }} to="/declined" ><button type="button" class="btn btn-info custom">DECLINED</button></Link>
              </div>
            </div>
          </div>

          <br></br>
          <div class="col-md-12">
            <h6 style={{ marginLeft: '40%' }}>{approveAdsNumber} advertisements  have been approved</h6>
          </div>
          <br></br>
          <div className="container-fluid">



            <MUIDataTable
              columns={columns}
              // data={Data}
              data={
                Data.map(item => {
                  return [
                    item.comp_name,
                    item.ad_id,
                    item.internship_position,
                    item.no_of_positions,
                    item.no_of_applicants,
                    item.comp_website,
                  ]
                })
              }
              options={{
                options,
                selectableRows: "none",
                viewColumns: false,
                download: false,
                print: false,
                //rowsPerPage: 7,
                rowsPerPage: 5,
                rowsPerPageOptions: [5, 10, 20, 50],
                onRowClick: handleRowClick,
              }}
            />
          </div>
          <br></br>
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

      </div >
    </div >
  )
}

export default Approved;