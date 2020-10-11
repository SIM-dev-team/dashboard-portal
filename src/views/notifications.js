import React from 'react';
import Navbar from '../components/navbar'
import SideBar from '../components/sidebar'
import Content from '../content/notification/nHome';


function Notifications(){
    return (
        <div>
        <Navbar/>
        <SideBar/>
        <Content/>
        </div>
    );
}

export default Notifications;