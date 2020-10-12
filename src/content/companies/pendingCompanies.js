import React, { Component } from 'react'
import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { Modal, Button, Dropdown } from 'react-bootstrap';

import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'
import Axios from 'axios'
 
export default class PendingCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            com_names:[],
            error: null,
            search_field:'',
            show: false,
            hideDefult: false,
            hideFilter: true,
            alphabet:'',
            company_obj: {
                com_name:'', com_email:'', com_dis:'', com_num:'', com_adrz:'', com_intern:'', com_estb:'', com_fax:''
            },
            email: '',
            subject: '',
            message: '',
            approve: ''
        }
    }

    async componentDidMount(){
        try{
            fetch('Http://localhost:5000/company/getAll').then((res) => res.json())
            .then((data) => {
                data.sort((a, b) => a.comp_name.localeCompare(b.comp_name))
                data.forEach( element => {
                    if(element.is_approved === false){
                        this.state.com_names.push(element)
                    }
                })        
            this.setState({ hideDefault:this.props.fromView, hideFilter: true });
            });
        }  catch(error){ 
            this.setState({error: error});
        }
    }
    
    searchFunc = (e) => {
        this.setState({search_field: e.target.value});
    }
    handlePageClick = (e) => {
        this.setState({alphabet: e.target.value, hideDefult: true, hideFilter:false});
    }
    msgClick = (e) => {
        this.setState({hideForm: true, email: e.email,
            company_obj:{com_name:e.comp_name, com_web:e.comp_website, com_dis:e.description, com_num:e.contact_number, com_mail: e.email}});
    }
    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    }
    onSubChange = (e) => {
        this.setState({subject: e.target.value})
    }
    onMessageChange = (e) => {
        this.setState({message: e.target.value})
    }
    onSendMsg = (e) => {
        console.log(e);
        const msgBody ={emailBody:this.state.message, email:this.state.email, title: this.state.subject}
        Axios.post('http://localhost:5000/company/sendMailtoCompany', msgBody).then(response => console.log(response)).catch(error => {
            console.error('There was an error!', error);
        });
    }
    viewClick = (e) => {
        this.setState({ show: true, company_obj:{com_name:e.comp_name, com_web:e.comp_website, com_dis:e.description, com_num:e.contact_number, 
            com_adrz:e.address, com_estb:e.date_of_establishment, com_intern: e.provide_internships, com_fax: e.fax_number}});
    }
    isApprove = (e) => {
        console.log(e);
        const data = {  comp_id : e.comp_id};
        Axios.post('http://localhost:5000/company/approveCompany', data).then(response=> console.log(response)).catch(err=>{
            console.log(err); });
    }
    isDecline = (e) => {
        console.log(e);
        const data = { comp_id : e.comp_id}; 
        Axios.post('http://localhost:5000/company/declineCompany', data).then(response=> console.log(response)).catch(err=>{
            console.log(err); });
    }

    render() {
        const {com_names ,alphabet, search_field} = this.state
        const filter_companie = com_names.filter(company => ((company.comp_name.toLowerCase().includes(search_field.toLowerCase())) ));      
        const filter_compani = com_names.filter(company => (company.comp_name.charAt(0).toLowerCase()=== alphabet.toLowerCase() ));    
        return (
            <div>
                <Navbar/>
                <SideBar/>
            <div className="admin-content">
            <div className="companies">
                <div>
                    <button className="compnaytab"><Link style={{color:'white'}} to="/registeredcom" >Registered Companies</Link></button>
                    <button className="compnaytab"><Link style={{color:'white'}} to="/pendingcom">Pending to be Approved</Link></button>
                    <button className="compnaytab"><Link style={{color:'white'}} to="/blacklistedcom">BlackListed Companies</Link></button>
                    {/* <button className="compnaytab"><Link style={{color:'black'}} to="/toAllComs">To All Companies</Link></button> */}
                </div>
                <form className=" search-bar"   >
                    <i className="material-icons inline" style={{position:'absolute', margin:'0.6em 32em'}}>search</i>
                    <input type="text" onChange={this.searchFunc}  placeholder="Search.." name="search"></input>
                </form>
                <div className="containerAlph">
                    <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                        <a className="page-link" href="# " aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(65)} onClick={this.handlePageClick} >A</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(66)} onClick={this.handlePageClick} >B</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(67)} onClick={this.handlePageClick} >C</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(68)} onClick={this.handlePageClick} >D</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(69)} onClick={this.handlePageClick} >E</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(70)} onClick={this.handlePageClick} >F</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(71)} onClick={this.handlePageClick} >G</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(72)} onClick={this.handlePageClick} >H</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(73)} onClick={this.handlePageClick} >I</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(74)} onClick={this.handlePageClick} >J</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(75)} onClick={this.handlePageClick} >K</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(76)} onClick={this.handlePageClick} >L</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(77)} onClick={this.handlePageClick} >M</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(78)} onClick={this.handlePageClick} >N</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(79)} onClick={this.handlePageClick} >O</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(80)} onClick={this.handlePageClick} >P</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(81)} onClick={this.handlePageClick} >Q</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(82)} onClick={this.handlePageClick} >R</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(83)} onClick={this.handlePageClick} >S</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(84)} onClick={this.handlePageClick} >T</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(85)} onClick={this.handlePageClick} >U</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(86)} onClick={this.handlePageClick} >V</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(87)} onClick={this.handlePageClick} >W</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(88)} onClick={this.handlePageClick} >X</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(89)} onClick={this.handlePageClick} >Y</button></li>
                        <li className="page-item"><button className="page-link" value={String.fromCharCode(90)} onClick={this.handlePageClick} >Z</button></li>
                        <li className="page-item">
                        <a className="page-link" href="# " aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                    </nav>
                </div>
                       
                <div hidden={this.state.hideDefult}  className="cards">
                {filter_companie && filter_companie.map((company_data, index) => {
                return(
                            <div className="card text-white mb-3" style={{ borderRadius:'5', backgroundColor:'#7f8fa6',margin: '5px 14px'}} key={index}>
                            <img className="company-logo" src={company_data.profile_pic_url} alt="com_logo"/>
                                <div className="card-body " style={{marginLeft:' 10em'}}>
                                    <h3 className="card-title" style={{position:'relative', fontSize:'30px'}}>{company_data.comp_name}</h3>
                                    <p className="card-title" style={{position:'relative', fontSize:'15px'}}><b>Contact Number :</b>&ensp;{company_data.contact_number}</p>
                                    <p className="card-title" style={{position:'relative', fontSize:'15px'}}><b>E-Mail :</b>&ensp;{company_data.email}</p>
                                    <div style={{position:'relative'}}><hr/>
                                        <button type="button" className="btn-appr" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.isApprove(company_data)}>Approve</button>&emsp;
                                        <button type="button" className="btn-decl" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.isDecline(company_data)}>Decline</button>&emsp;&emsp;
                                        <button type="button" className="btn-viewmoreBlack" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.viewClick(company_data)}>View More...</button>
                                    </div>    
                                </div>  

                                <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                            <img className="company-logo-modal" src={company_data.profile_pic_url} alt="com_logo" position="relative"/>
                                <Modal.Header style={{backgroundColor:'#192a56'}} >
                                    <Modal.Title style={{color:'white', marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=> this.isDecline(company_data) } href="#/action-1">Block Company</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Modal.Header>
                                <Modal.Body style={{paddingLeft:'12em',color:'black' }}>
                                <p><b>{this.state.company_obj.com_dis}</b></p>
                                <a href={this.state.company_obj.com_web} target="_blank" >{this.state.company_obj.com_web}</a>
                                <br/><br/>
                                <p><b>Date of Establish :</b> {this.state.company_obj.com_estb}</p>
                                <p><b>Fax Number : </b>{this.state.company_obj.com_fax}</p>
                                <p><b>Comapny Address : </b>{this.state.company_obj.com_adrz}</p>
                                </Modal.Body>
                                <Modal.Footer style={{backgroundColor:'#192a56'}}>
                                    {/* <Button type="Submit" onClick={()=>this.msgClick(company_data)} >Send Message</Button> */}
                                    <Button onClick={()=> this.setState({show: false})}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>      
                                
                                <Modal  show={this.state.hideForm} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                                    <Modal.Header >
                                        <Modal.Title style={{marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">mail</i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="E-mail" value={this.state.email || ''} onChange={this.onEmailChange.bind(this)} ></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">label</i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="subject" value={this.state.subject || ''} onChange={this.onSubChange.bind(this)} ></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">create</i></span>
                                            </div>
                                            <textarea type="text" className="form-control" rows="4" placeholder="your message" value={this.state.message || ''} onChange={this.onMessageChange.bind(this)} ></textarea>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button value={company_data} onClick={(e) => this.onSendMsg(company_data)}>Send</Button>
                                        <Button onClick={()=> this.setState({hideForm: false})}>Cancel</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>          
                );
            })}
            </div>                          
                <div hidden={this.state.hideFilter}  className="cards">
            {filter_compani && filter_compani.map((company_data, index) => {
                return(
                    <div className="card text-white mb-3" style={{ borderRadius:'5', backgroundColor:'#7f8fa6',margin: '5px 14px'}} key={index}>
                            <img className="company-logo" src={company_data.profile_pic_url} alt="com_logo"/>
                                <div className="card-body " style={{marginLeft:' 10em'}}>
                                    <h3 className="card-title" style={{position:'relative', fontSize:'30px'}}>{company_data.comp_name}</h3>
                                    <p className="card-title" style={{position:'relative', fontSize:'15px'}}><b>Contact Number :</b>&ensp;{company_data.contact_number}</p>
                                    <p className="card-title" style={{position:'relative', fontSize:'15px'}}><b>E-Mail :</b>&ensp;{company_data.email}</p>
                                    <div style={{position:'relative'}}><hr/>
                                        <button type="button" className="btn-appr" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.isApprove(company_data)}>Approve</button>&emsp;
                                        <button type="button" className="btn-decl" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.viewClick(company_data)}>Decline</button>&emsp;&emsp;
                                        <button type="button" className="btn-viewmoreBlack" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.viewClick(company_data)}>View More...</button>
                                    </div>    
                                </div>  

                                <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                            <img className="company-logo-modal" src={company_data.profile_pic_url} alt="com_logo" position="relative"/>
                                <Modal.Header style={{backgroundColor:'#192a56'}} >
                                    <Modal.Title style={{color:'white', marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Block Company</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Modal.Header>
                                <Modal.Body style={{paddingLeft:'12em',color:'black' }}>
                                <p><b>{this.state.company_obj.com_dis}</b></p>
                                <a href={this.state.company_obj.com_web} target="_blank" >{this.state.company_obj.com_web}</a>
                                <br/><br/>
                                <p><b>Date of Establish :</b> {this.state.company_obj.com_estb}</p>
                                <p><b>Fax Number : </b>{this.state.company_obj.com_fax}</p>
                                <p><b>Comapny Address : </b>{this.state.company_obj.com_adrz}</p>
                                </Modal.Body>
                                <Modal.Footer style={{backgroundColor:'#192a56'}}>
                                    {/* <Button type="Submit" onClick={()=>this.msgClick(company_data)} >Send Message</Button> */}
                                    <Button onClick={()=> this.setState({show: false})}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>        
                               
                                <Modal  show={this.state.hideForm} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                                    <Modal.Header >
                                        <Modal.Title style={{marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">mail</i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="E-mail" value={this.state.email || ''} onChange={this.onEmailChange.bind(this)} ></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">label</i></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="subject" value={this.state.subject || ''} onChange={this.onSubChange.bind(this)} ></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><i className="material-icons inline">create</i></span>
                                            </div>
                                            <textarea type="text" className="form-control" rows="4" placeholder="your message" value={this.state.message || ''} onChange={this.onMessageChange.bind(this)} ></textarea>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button value={company_data} onClick={() => this.onSendMsg(company_data)}>Send</Button>
                                        <Button onClick={()=> this.setState({hideForm: false})}>Cancel</Button>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                        
                    
                );
            })}
            </div>           
            </div>
            </div>
            </div>
        )
    
    }
}

export class PendAlpha extends Component{

}