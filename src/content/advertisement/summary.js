import React, { useState, useEffect } from 'react';
import './ad.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import axios from 'axios';

function Adverts() {
    const [loading, setLoading] = useState(false);
    const [adData, setAdData] = useState([]);
    const [number, setNumber] = useState(0);
    const [compNumber, setCompNumber] = useState(0);


    //get All adverts 
    useEffect(() => {
        setLoading(true)
        try {
            axios
                .get(`http://localhost:5000/advert/getAll`)
                .then(res => {
                    setAdData(res.data);
                })

        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }, [loading])

    //get number of  ads
    useEffect(() => {
        setNumber(adData.length);
    }, [adData])

    //get number of companies that posted ads
    useEffect(() => {
        setLoading(true)
        try {
            axios
                .get(`http://localhost:5000/advert/getAdPostedCompanies`)
                .then(res => {
                    setCompNumber(res.data[0].count)
                })

        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }, [loading])
    console.log(compNumber);

    return (
        <div>
            <Navbar />
            <SideBar />
            <div className="admin-content">


                {/* <div class="container p-3 my-3 bg-light">
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

                <div className="adverts" >
                    <center>{number} Ads from</center>
                    <center>{compNumber} registered companies </center>
                    <center>have been received</center>
                    <br></br>
                    <button type="button" class="btn btn-info" style={{ background: '#01506e' }}><Link style={{ color: 'white' }} to="/setDeadline" >CHANGE THE DEADLINE</Link></button>

                </div>
            </div>
        </div>
    )
}

export default Adverts;