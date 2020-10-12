

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//dashboard views
import DashboardHome from './views/dashboardr-home'
import Companies from './views/companies'
import Students from './views/students'
import StudentCvs from './views/studentCvs'
import Emailing from './views/emailing'
//import Notifications from './views/notifications'
import Users from './views/users'
import Adverts from './views/adverts'
import Login from './views/login'

//advertisement2 components
import setDeadline from './content/advertisements2/setDeadline'
import adCategories from './content/advertisements2/adCategories'
import regCompanyList from './content/advertisements2/regCompanyList'

import Student_csv from './content/students/student_csv';
import Student_enrolling from './content/students/student_enrolling'
import Student_enrolled from './content/students/student_enrolled'
import Student_list2 from './content/students/student_list2'
import Confirmed_students from './content/students/confirmed_students'

import adHome1 from './content/advertisement/adHome1'
import adHome2 from './content/advertisement/adHome2'
import approved from './content/advertisement/approved'
import pending from './content/advertisement/pending'
import declined from './content/advertisement/declined'
import category from './content/advertisement/category'
import summary from './content/advertisement/summary'

import nHome from './content/notification/nHome'
import msg from './content/notification/msg'


// import Companies from './content/companies/companies'
import BlackListedCompany from './content/companies/blackListedCompanies'
import RegisteredCompany from './content/companies/registeredCompanies'
import PendingCompany from './content/companies/pendingCompanies'
import toAllCompanies from './content/companies/toAllCompanies';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashboardHome} />
        <Route path="/companies" component={Companies} />
        <Route path="/students" component={Students} />
        <Route path='/adverts' component={Adverts} />
        <Route path="/cvs" component={StudentCvs} />
        <Route path="/emailing" component={Emailing} />
        <Route path="/users" component={Users} />

        <Route path="/nHome" component={nHome} />
        <Route path="/msg" component={msg} />

        <Route path="/setDeadline" component={setDeadline} />
        <Route path="/adCategories" component={adCategories} />
        <Route path="/regCompanyList" component={regCompanyList} />


        <Route path="/adHome1" component={adHome1} />
        <Route path="/adHome2" component={adHome2} />
        <Route path="/approved" component={approved} />
        <Route path="/pending" component={pending} />
        <Route path="/declined" component={declined} />
        <Route path="/category" component={category} />
        <Route path="/summary" component={summary} />

        <Route path="/registeredcom" component={RegisteredCompany} />
        <Route path="/pendingcom" component={PendingCompany} />
        <Route path="/blacklistedcom" component={BlackListedCompany} />
        {/* <Route path="/toAllComs" component={toAllCompanies}/> */}

        <Route path="/student_csv" component={Student_csv} />
        <Route path="/student_enrolling" component={Student_enrolling} />
        <Route path="/student_enrolled" component={Student_enrolled} />
        <Route path="/student_list2" component={Student_list2} />
        <Route path="/confirmed_students" component={Confirmed_students} />

        <Redirect from="/" to="/dashboard" />
      </Switch>
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
