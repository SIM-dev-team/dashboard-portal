import React, { useState, useEffect } from 'react'
import './ad.css'
import MUIDataTable from 'mui-datatables'
import 'bootstrap/dist/css/bootstrap.css'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import axios from 'axios'
import { FcApproval, FcDisapprove } from 'react-icons/fc'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';







function Pending() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [adData, setAdData] = useState([]);
  const [adId, setAdId] = useState();
  const [pendingNum, setPendingNum] = useState(0);
  const [modalData, setModalData] = useState([]);
  const history = useHistory();
  const handleClose = () => setShow(false);




  //for getting all adverts data and get pending ads
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`http://localhost:5000/advert/getPending`)
        .then(res => {
          setAdData(res.data);
        })

    } catch (error) {
      console.log(error);

    }


    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  console.log(adData)

  //get the number of pending adverts
  useEffect(() => {
    setPendingNum(adData.length);
  }, [adData])
  console.log(pendingNum)


  // const onButtonClick = () => {
  //   toast.success('Category Added Successfully ', { position: toast.POSITION.TOP_RIGHT });
  // }



  //when click on row get ad ID
  const handleRowClick = (rowData) => {
    setAdId(rowData[1]);
  }

  const showModal = () => {
    let key = adId;
    console.log(adId);
    for (var i = 0; i < adData.length; i++) {
      if (key === adData[i].ad_id) {
        setModalData(adData[i]);
      }
    }
    setShow(true);
  }


  //Handle approve  adverts
  const handleApprove = () => {
    console.log(adId);
    let dataObj = {
      id: adId
    }

    console.log(dataObj)
    setTimeout(() => {
      axios
        .put(`http://localhost:5000/advert/ApproveAdvert`, dataObj)
        .then(res => {
          console.log(res.data);
          console.log("approved");
          toast.success('Advert Approved ', { position: toast.POSITION.TOP_RIGHT });
          //history.push('/pending');
          window.location.reload(false);
        })
        .catch(e => {
          console.log(e);
        })

    }, 2000);
  }

  //handle decline adverts
  const handleDecline = () => {
    console.log(adId);
    let dataObj = {
      id: adId
    }
    console.log(dataObj)
    setTimeout(() => {
      axios
        .put(`http://localhost:5000/advert/DeclineAdvert`, dataObj)
        .then(res => {
          console.log(res.data);
          console.log("Declined");
          toast.error('Advert Declined  ', { position: toast.POSITION.TOP_RIGHT });
          //history.push('/pending');
          window.location.reload(false);

        })
        .catch(e => {
          toast.error('Error Occured  ', { position: toast.POSITION.TOP_RIGHT });
          console.log(e);
        })

    }, 1000);
  }


  const confirmAlertBox = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <div style={{ justifyContent: 'center' }}>
              <h1>Are you sure?</h1>
              <p style={{ marginLeft: '10%' }}>You want decline the advert</p>
            </div>

            <div className="row" style={{ justifyContent: 'center' }}>
              <span className='col-4' style={{ marginRight: "3%" }}>
                <Button className='btn-danger' size='lg' onClick={onClose}>No</Button>
              </span>
              <span className='col-4'>
                <Button className='btn-success' size="lg"
                  onClick={() => {
                    handleDecline();
                    onClose();
                  }}
                >
                  Yes
                </Button>
              </span>
            </div>
          </div>
        );
      }
    });
  }






  const columns = [
    'COMPANY NAME',
    'ADVERT CODE',
    'INTERNSHIP POSITION',
    'NO OF POSITIONS',

    {
      name: '',
      options: {
        customBodyRenderLite: () => {
          return (
            <Button variant="outline-info" size="sm" onDoubleClick={showModal}>
              {`View More`}
            </Button>
          );
        }
      },
    },
    {
      name: '',
      options: {
        customBodyRenderLite: () => {
          return (
            <Button className='btn-light' size="sm" onDoubleClick={handleApprove}>
              <FcApproval size={20} />
            </Button>
          );
        }
      },
    },
    {

      name: '',
      options: {
        customBodyRenderLite: () => {
          return (
            <Button className='btn-light' size="sm" onDoubleClick={confirmAlertBox}>
              <FcDisapprove size={23} />
            </Button>
          );
        }
      },

    }
  ]

  let Data = adData;

  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
  }

  return (
    <div>
      <div>
        <ToastContainer newestOnTop={true} />
      </div>
      <Navbar />
      <SideBar />
      <div className="admin-content">
        <div class="container p-3 my-3 bg-light" >
          <div class="form-group row">


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


        <div className="col-md-8" >
          <h6 style={{ marginLeft: '56%' }}>{pendingNum} advertisements  pending the approval</h6>
        </div>
        <br></br>
        <div className="container-fluid">
          <MUIDataTable
            columns={columns}
            data={Data.map(item => {
              return [
                item.comp_name,
                item.ad_id,
                item.internship_position,
                item.no_of_positions,
              ]
            })}
            options={{
              options,
              selectableRows: "none",
              viewColumns: false,
              download: false,
              print: false,
              rowsPerPage: 5,
              rowsPerPageOptions: [5, 10, 15, 20, 50, 100],
              onRowClick: handleRowClick


            }}
          />
        </div>
        <br></br>

        {/* <div class="form-group row">

          <div class="col-md-8">

          </div>



          <div class="col-md-2">
            <button type="button" class="btn btn-info smbtn" style={{ background: '#1a84ad' }}>PUBLISH</button>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-info smbtn" style={{ background: '#d12317' }}>CANCEL</button>
          </div>
        </div> */}

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
      </div>
    </div >
  )
}

export default Pending;