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
                     <h3>Message</h3>

              <form>
                 <div class="form-group">
                <label for="exampleFormControlTextarea1">Enter your mssage</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">SEND</button>
</form>
           

 





                </div>

            </div>
        </div>
    )
}


export default nHome