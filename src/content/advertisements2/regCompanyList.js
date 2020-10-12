import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import './ads2.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function RegCompanyList() {


  let selecteDeadline = localStorage.getItem('Deadline');
  console.log(selecteDeadline)

  //let history = useHistory();


  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regCompanyData, setRegCompanyData] = useState([])
  const [modalData, setModalData] = useState([]);
  const [success, setSucces] = useState(false);
  const handleClose = () => setShow(false);

  // getting data from the server to pass to the modal 
  const handleShow = (rowData) => {

    let key = rowData[3];
    for (var i = 0; i < regCompanyData.length; i++) {
      if (key === regCompanyData[i].email) {
        setModalData(regCompanyData[i]);
      }
    }
    setShow(true);
  }

  let dateData = new Date(selecteDeadline);
  // let datestring = dateData.toDateString();
  // let dateNeed = new Date(datestring);

  var day = dateData.getDate();
  var month = 1 + dateData.getMonth();
  var year = dateData.getFullYear();
  var dateAssembled = day + "-" + month + '-' + year



  console.log('deadline is ', dateAssembled);


  // for getting all registered company data 
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`http://localhost:5000/company/getApprovedCompany`)
        .then(res => {

          // console.log(res.data[0].is_verified);
          // for (var i = 0; i < res.data.length; i++) {
          //   if (res.data[i].is_approved === true) {
          //     setRegCompanyData(res.data);
          //   }
          // }
          setRegCompanyData(res.data);
          console.log(regCompanyData);
        })
        .catch(e => {
          console.log(e);
        })

    } catch (error) {
      console.log(error);

    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])
  //console.log(regCompanyData);

  const handleRequestAds = () => {
    try {
      axios
        .post(`http://localhost:5000/advert/requestAdverts`, { date: dateAssembled })
        .then(res => {
          console.log('data set to', res.data);
          if (res.data === `error`) {
            setSucces(false);
            toast.error('error occured while requesting ', { position: toast.POSITION.TOP_RIGHT });
          } else {
            toast.success('Request Adverts Successfully ', { position: toast.POSITION.TOP_RIGHT });
            setSucces(true);
          }
        })

    } catch (error) {
      console.log(error);


    }
  }



  const columns = [
    'Company Name',
    'Registration Date',
    'Contact Number',
    'Email',
    'Website',

    {
      name: "",
      options: {
        customBodyRenderLite: () => {
          return (
            <Button variant="outline-primary" size="sm" onClick={handleShow}>
              {`View more`}
            </Button>

          );


        }
      }
    }
  ]
  let data = regCompanyData;



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
      <div
        className="container-fluid  list_container"
        style={{ width: '85%', marginLeft: '13em', position: 'relative' }}
      >
        <h1>REGISTERED COMPANY LIST</h1>
        <MUIDataTable
          columns={columns}
          data={data.map(item => {
            return [
              item.comp_name,
              item.date_of_establishment,
              item.contact_number,
              item.email,
              item.comp_website,
            ]
          })}
          options={{
            options,
            selectableRows: "none",
            viewColumns: false,
            download: false,
            print: false,
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 20, 50],
            onRowClick: handleShow
          }}
        />

        <div>
          {/* model to show company details */}
          {/* <Modal show={show} onHide={handleClose} >
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label style={{ fontSize: 17 }}>Company Name</Form.Label>
                  <Form.Control type="text" placeholder={modalData.comp_name} disabled style={{ fontSize: 18 }} >
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Registration Date</Form.Label>
                  <Form.Control type="text" placeholder={modalData.date_of_establishment} disabled style={{ fontSize: 18 }} >
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Address</Form.Label>
                  <Form.Control type="text" placeholder={modalData.address} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Email</Form.Label>
                  <Form.Control type="text" placeholder={modalData.email} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Web Site</Form.Label>
                  <Form.Control type="text" placeholder={modalData.comp_website} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Contact Number</Form.Label>
                  <Form.Control type="text" placeholder={modalData.contact_number} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Fax Number</Form.Label>
                  <Form.Control type="text" placeholder={modalData.fax_number} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Number of Employees</Form.Label>
                  <Form.Control type="text" placeholder={modalData.num_of_employees} disabled style={{ fontSize: 18 }}>
                  </Form.Control>
                  <Form.Label style={{ fontSize: 17 }}>Number of Techleads</Form.Label>
                  <Form.Control type="text" placeholder={modalData.num_of_techleads} disabled style={{ fontSize: 18 }} >
                  </Form.Control>

                </Form.Group>
              </Form>
            </Modal.Body>

          </Modal> */}
          <Modal dialogClassName='modal-50w'
            show={show}
            onHide={handleClose} >
            <Modal.Body>
              <container>
                <div className='row'>
                  <span className="col-4">
                    <img src={modalData.profile_pic_url} alt='name' style={{ width: '40%', height: '70%', marginLeft: '60%' }} />
                  </span>
                  <span className="col-6" style={{ marginTop: '0%' }}>
                    <h1>{modalData.comp_name}</h1>
                  </span>
                </div>

                <div className='row' style={{ marginLeft: '5%' }}>
                  <span className='col-6'>
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Company Website</Form.Label>
                      <Form.Control type="text" placeholder={modalData.comp_website} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                  <span className='col-6' >
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Registration Date</Form.Label>
                      <Form.Control type="text" placeholder={modalData.date_of_establishment} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                </div>

                <div className='row' style={{ marginLeft: '5%' }}>
                  <span className='col-6'>
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Address</Form.Label>
                      <Form.Control type="text" placeholder={modalData.address} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                  <span className='col-6' >
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Email</Form.Label>
                      <Form.Control type="text" placeholder={modalData.email} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                </div>

                <div className='row' style={{ marginLeft: '5%' }}>
                  <span className='col-6'>
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Fax Number</Form.Label>
                      <Form.Control type="text" placeholder={modalData.fax_number} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                  <span className='col-6'>
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Contact Number</Form.Label>
                      <Form.Control type="text" placeholder={modalData.contact_number} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                </div>


                <div className='row' style={{ marginLeft: '5%' }}>
                  <span className='col-6'>
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Number of Employees</Form.Label>
                      <Form.Control type="text" placeholder={modalData.num_of_employees} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                  <span className='col-6' >
                    <Form>
                      <Form.Label style={{ fontSize: 17 }}>Number of Techleads</Form.Label>
                      <Form.Control type="text" placeholder={modalData.num_of_techleads} disabled style={{ fontSize: 18 }} >
                      </Form.Control>
                    </Form>
                  </span>
                </div>
                {/* <div className="col-10" style={{ maxWidth: '70%', maxHeight: '50%', marginLeft: '30%' }}>

                <img src={modalData.attachment_url} alt='name' style={{ width: '50%', height: '50%' }} />
              </div> */}

              </container>


            </Modal.Body>
          </Modal >

        </div>
        <div className="p-2 " style={{ marginLeft: '48em' }}>
          <div className='row'>
            {!success ? <div>
              <Link to="/summary" >
                <button
                  className="btn btn-success"
                  style={{ width: '200px', marginRight: '2em' }}
                  onClick={handleRequestAds}
                  disabled={!dateData}

                >
                  Request ADs
          </button>
              </Link>
            </div>
              : <div>
                <Link to="/regCompanyList" >
                  <button
                    className="btn btn-success"
                    style={{ width: '200px', marginRight: '2em' }}
                    onClick={handleRequestAds}
                    disabled={!dateData}

                  >
                    Request ADs
          </button>
                </Link>

              </div>}

            <Link style={{ color: 'red' }} to="/adHome1">
              <button className="btn btn-danger" style={{ width: '200px' }}>
                Cancel
          </button>
            </Link>
          </div>

        </div>
      </div>
    </div >
  )
}

export default RegCompanyList
