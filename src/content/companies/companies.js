import React, { Component } from 'react'
import '../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import ucsc_logo from '../../assets/images/red.jpg'
import { Modal, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

import Navbar from '../../components/navbar'
import SideBar from '../../components/sidebar'

export default class Companies extends Component {
    constructor(props){
        super(props);
        this.state = {
            com_names:[],
            error: null,
            search_field:'',
            show: false,
            hideDefult: false,
            hideFilter: true,
            hideForm:false,
            alphabet:'',
            company_obj: {
                com_name:'', com_web:'', com_dis:'', com_num:'', com_mail:''
            },
            email: '',
            subject: '',
            message: ''
        }
    }

    async componentDidMount(){
        try{
            fetch('Http://localhost:5000/company/getAll').then((res) => res.json())
            .then((data) => {
                data.sort((a, b) => a.comp_name.localeCompare(b.comp_name))
                for (let index = 0; index < data.length; index++) {
                    if(data[index].is_approved === false){
                        this.setState({com_names: data, hideDefault:this.props.fromView, hideFilter: true })
                    } 
                } 
            });
        }  catch(error){ 
            this.setState({error: error});
        }
        // try{
        //     fetch('Http://localhost:5000/company/getAll').then((res) => res.json())
        //     .then((data) => {
        //         data.sort((a, b) => a.comp_name.localeCompare(b.comp_name))
        //         this.setState({com_names: data, hideDefault:this.props.fromView, hideDefult: false, hideFilter: true });
        //     });
        // }  catch(error){ 
        //     this.setState({error: error});
        // }
    }
    handlePageClick = (e) => {
        this.setState({alphabet: e.target.value, hideDefult: true, hideFilter:false});
    }

    searchFunc = (e) => {
        this.setState({search_field: e.target.value});
    }

    msgClick = (e) => {
        // console.log(e);
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

    viewClick = (e) => {
        this.setState({ show: true,
            company_obj:{com_name:e.comp_name, com_web:e.comp_website, com_dis:e.description, com_num:e.contact_number, com_mail: e.email}
        });
    }
///////////////////////////////////////////////////////
    submitMessage = (e) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailBody : 'abcd', email: 'ranindujay@gmail.com' ,title: 'test title'})
    };

    fetch('http://localhost:5000/company/sendMailtoCompany', requestOptions)
        .then(async response => {
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log('done');
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });

    }
    
   ///////////////////////////////////////////////////////////////////////////// 
   render() {
    const {com_names ,alphabet, search_field} = this.state
    const filter_companie = com_names.filter(company => (
        (company.comp_name.toLowerCase().includes(search_field.toLowerCase()))
        ));
    
    const filter_compani = com_names.filter(company => (company.comp_name.charAt(0).toLowerCase()=== alphabet.toLowerCase() ))   
    return (
        <div>
            <Navbar/>
            <SideBar/>
        <div className="admin-content">
        <div className="companies">
            <div>
                <button className="compnaytab"><Link style={{color:'black'}} to="/registeredcom" >Registered Companies</Link></button>
                <button className="compnaytab"><Link style={{color:'black'}} to="/pendingcom">Pending to be Approved</Link></button>
                <button className="compnaytab"><Link style={{color:'black'}} to="/blacklistedcom">BlackListed Companies</Link></button>
                <button className="compnaytab"><Link style={{color:'black'}} to="/toAllComs">To All Companies</Link></button>
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
                        <div className="card text-black mb-3" style={{ backgroundColor:'#b2bec3',margin: '5px 10px'}} key={index}>
                            <img className="company-logo" src={ucsc_logo} alt="ucsc_logo"/>
                            <div className="card-body " style={{marginLeft:' 10em'}}>
                                <h3 className="card-title" style={{position:'relative', fontSize:'30px'}}>{company_data.comp_name}</h3>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>Contact Number :&ensp;{company_data.contact_number}</p>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>Contact register Name:&ensp;{ 'James anderson example'}</p>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>E-Mail :&ensp;{company_data.email}</p>
                                <div style={{position:'relative'}}><hr/>
                                    <button type="button" className="btn text-white" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.msgClick(company_data)}>Send Message</button>&emsp;&emsp;
                                    <button type="button" className="btn text-white" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.viewClick(company_data)}>View More...</button>
                                </div>    
                            </div>  

                            <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                                    <img className="company-logo" src={ucsc_logo} alt="ucsc_logo"/>
                                    <Modal.Header >
                                        <Modal.Title style={{marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                        <Dropdown >
                                            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Block Company</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Modal.Header>
                                    <Modal.Body style={{paddingLeft:'12em'}}>
                                        <p>
                                        {this.state.company_obj.com_dis}
                                        </p>
                                        <a href="# " >{this.state.company_obj.com_web}</a>
                                        <p>
                                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                            consectetur ac, vestibulum at eros.
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="submit" onClick={()=>this.msgClick(company_data)}>Send Message</Button>
                                        <Button onClick={()=> this.setState({show: false})}>Cancel</Button>
                                    </Modal.Footer>
                                </Modal>        
                            
              {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////               */}
                            
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
                                    <Button >Send</Button>
                                    <Button onClick={()=> this.setState({hideForm: false})}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                        </div>
                    
                
            );
        })}
        </div>
                        
        <div hidden={this.state.hideFilter}  className="cards">
        {filter_compani && filter_compani.map((company_data, index) => {
            return(
                    <div className="card text-black mb-3" style={{ backgroundColor:'#b2bec3',margin: '5px 10px'}} key={index}>
                            <img className="company-logo" src={ucsc_logo} alt="ucsc_logo"/>
                            <div className="card-body " style={{marginLeft:' 10em'}}>
                                <h3 className="card-title" style={{position:'relative', fontSize:'30px'}}>{company_data.comp_name}</h3>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>Contact Number :&ensp;{company_data.contact_number}</p>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>Contact register Name:&ensp;{ 'James anderson example'}</p>
                                <p className="card-title" style={{position:'relative', fontSize:'15px'}}>E-Mail :&ensp;{company_data.email}</p>
                                <div style={{position:'relative'}}><hr/>
                                    <button type="button" className="btn text-white" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.msgClick(company_data)}>Send Message</button>&emsp;&emsp;
                                    <button type="button" className="btn text-white" style={{backgroundColor:'#2d3436'}} value={company_data} onClick={()=>this.viewClick(company_data)}>View More...</button>
                                 </div>
                            </div>
                            
                            <Modal show={this.state.show} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
                                <img className="company-logo" src={ucsc_logo} alt="ucsc_logo"/>
                                <Modal.Header >
                                    <Modal.Title style={{marginLeft:'10em'}} id="contained-modal-title-vcenter">{this.state.company_obj.com_name}</Modal.Title>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Block Company</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Modal.Header>
                                <Modal.Body style={{paddingLeft:'12em'}}>
                                    <p>
                                    {this.state.company_obj.com_dis}
                                    </p>
                                    <a href="# " >{this.state.company_obj.com_web}</a>
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                        consectetur ac, vestibulum at eros.
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="submit" onClick={()=>this.msgClick(company_data)}>Send Message</Button>
                                    <Button  onClick={()=> this.setState({show: false})}>Cancel</Button>
                                </Modal.Footer>
                                </Modal>
                           
                            <Modal show={this.state.hideForm} size="lg" aria-labelledby="contained-modal-title-vcenter" animation={false} centered>
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
                                    <Button >Seend</Button>
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

