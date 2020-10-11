import React from 'react';
//import './ad.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'

function nHome() {
    return (
        <div>
            <Navbar />
            <SideBar />
            <div className="admin-content">
            <div class="container p-4 my-4 bg-light" >

            <div class="form-group row">
              <div class="col-md-6">
                <Link style={{ color: 'white' }} to="/msg" > <button type="button" class="btn btn-info custom ">COMPANY</button></Link>
              </div>
              <div class="col-md-6">
                <Link style={{ color: 'white' }} to="/msg" ><button type="button" class="btn btn-info custom">STUDENT</button></Link>
              </div>
            </div>







        </div>

            </div>
        </div>
    )
}


export default nHome