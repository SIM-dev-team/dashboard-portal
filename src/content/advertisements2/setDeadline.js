import React, { Component } from 'react'
import { Card, Form } from 'react-bootstrap'
import './ads2.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";





class setDeadline extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todayDate: new Date(),
      selectedDate: null,

    }

    console.log('today date=============' + this.state.todayDate);


  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date })
    console.log(this.state.selectedDate);
  }
  checkDate = (date) => {
    if (this.state.todayDate > this.state.date) {
      console.log("date can't be set");
    } else {
      console.log('date is set ' + this.state.selectedDate);
      localStorage.setItem("Deadline", this.state.selectedDate);
    }
  }




  render() {
    return (
      <div>
        <Navbar />
        <SideBar />
        <div className="btn_pos">

          <Link style={{ color: "white" }} to='/adCategories'>
            <button className="catogeries_btn" style={{ outline: 'none' }}>
              Advertisement Categories
              </button>
          </Link>

          <Link style={{ color: 'white' }} to="/regCompanyList">
            <button className="registered_company_btn" style={{ outline: 'none' }}>
              Registered Company List
            </button>
          </Link>
        </div>



        <div className="container deadline_container">
          <Card
            className="set_deadline_card"
            style={{ border: ' 2px solid rgb(97, 98, 99)' }}
          >
            <Form className="deadline_form" >
              <Form.Group controlId="deadline">
                <Form.Label className="deadline_form_label">
                  Set Deadline
                </Form.Label>
                <div style={{ marginLeft: '31%' }}>
                  <DatePicker selected={this.state.selectedDate} onChange={date => this.handleDateChange(date)} minDate={this.state.todayDate} isClearable dateFormat='yyyy/MM/dd' />
                </div>

              </Form.Group>
            </Form>
            <Link style={{ color: 'white' }}
              to='/regCompanyList'
            >
              <button
                onClick={this.checkDate(this.state.selectedDate)}
                className="continue-btn  "
                style={{ outline: 'none' }}
                type="button"
                disabled={!this.state.selectedDate}
              >
                Continue
            </button>
            </Link>

          </Card>
          <div>

          </div>
        </div>
      </div >

    )
  }


}

export default setDeadline


