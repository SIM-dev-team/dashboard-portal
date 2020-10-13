import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ucsc_logo from '../assets/images/ucsc_logo.jpeg'


function SideNavbar() {
    return (
        <div className="side-bar">
            <img className="sidebar-logo" src={ucsc_logo} alt="ucsc_logo" />
            <hr />
            <div className="empty-box"></div>
            {/* <Link to="/dashboard"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">dashboard</span>Dashboard</div></Link> */}
            <Link to="/registeredcom"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">corporate_fare</span>Companies</div></Link>
            <Link to="/students"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">people</span>Students</div></Link>
            <Link to="/adverts"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">view_carousel</span>Advertiesments</div></Link>
            {/* <Link to="/cvs"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">text_snippet</span>Student CVs</div></Link> */}
            {/* <Link to="/emailing"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">mail</span>E mailing</div></Link> */}
            <Link to="/users"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">people</span>Users</div></Link>
            <Link to="/nHome"><div className="sidebar-link">
                <span className="material-icons sidebar-icon">notification_important</span>Notifications</div></Link>
        </div>
    )
}

export default SideNavbar;