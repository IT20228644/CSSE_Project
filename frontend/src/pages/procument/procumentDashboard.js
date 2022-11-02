
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Layout from '../../components/Layout';
import jsPDF from 'jspdf';


function ProcumentDashboard() {
 
    const [AllPeddingReqs,setAllPeddingReqs] = useState([]);
     
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            axios.get("http://localhost:5000/stockReq/pending")
            .then(res => setAllPeddingReqs(res.data))
            .catch(error => console.log(error));
            },[])
    
    

     const [AllReject,setAllReject] = useState([]);
     useEffect(() => {
       axios.get("http://localhost:5000/stockReq/reqReject")
       .then(res => setAllReject(res.data))
       .catch(error => console.log(error));
     },[])
  
     const [AllAccept,setAllAccept] = useState([]);
     useEffect(() => {
       axios.get("http://localhost:5000/stockReq/reqAccept")
       .then(res => setAllAccept(res.data))
       .catch(error => console.log(error));
     },[])
     const [AllSend,setAllSend] = useState([]);
     useEffect(() => {
       axios.get("http://localhost:5000/stockReq/reqSend")
       .then(res => setAllSend(res.data))
       .catch(error => console.log(error));
     },[])
    const [CompleteService,setallServiceComplete] = useState([]);
    useEffect(() => {
       axios.get("http://localhost:5000/stockReq/reqComplete")
       .then(res => setallServiceComplete(res.data))
       .catch(error => console.log(error));
     },[])

      function remove(username){
        axios.delete("http://localhost:5000/employee/deleteEmployee/"+username).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Employee Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Employee Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function view( username, name, address, phone, gender, bod, nic) {
         reactLocalStorage.setObject("EmployeeView", [username, name, address, phone, gender, bod, nic]);
         window.location.href = "/EmployeeView";
    }

    function editEmployeeProfile( username, name, address, phone, gender, bod, nic, position, salary)
    { 
        reactLocalStorage.setObject("EmployeeEdit", [username, name, address, phone, gender, bod, nic, position, salary]);
        window.location.href = "/EmployeeEdit";
    }

    function accept(id)
    {
            const status = "Accept";
            const statusUpdate ={status}
            axios.put("http://localhost:5000/stockReq/statusUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/procument_dash";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function reject(id)
    {
        const status = "Reject";
        const statusUpdate ={status}
        axios.put("http://localhost:5000/stockReq/statusUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/procument_dash";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

     function complete(id)
    {
            const status = "Complete";
            const statusUpdate ={status}
            axios.put("http://localhost:5000/stockReq/statusUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/procument_dash";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }


    function rejectDelete(id) {
        axios.delete("http://localhost:5000/stockReq/deletereq/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Reject Booking Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Reject Booking Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }



    function pdfDownload(){
        var doc = new jsPDF();
        const name = 'Report'
        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, name)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Total of shipped procument requests : '+AllSend.length)
        doc.text(25, 50, 'Total of accepted procument requests : '+AllAccept.length)
        doc.text(25, 60, 'Total of rejected procument requests : '+AllReject.length)
      
      
        doc.save(name+'.pdf')
    } 


    return (
        <Layout>
    <div className="dashboard-main-wrapper" >
    
        <div className="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                          <h2 className="text-uppercase text-black">PROCUREMENT MANAGEMENT</h2>
                     </center>
                     <div className="text-end mt-5">
                       <a href="#Accept">
                        <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                            Accepted Request
                        </MDBBtn>{' '}
                       </a>
                        <a href="#Reject">
                            <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='danger'>
                              Reject Request
                            </MDBBtn>{' '}
                        </a>
                        <a href="#Pending">
                            <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='primary'>
                                Pending Request
                            </MDBBtn>{' '}
                        </a>

                         <a href="#Complete">
                            <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}} outline color='secondary'>
                                Complete Request
                            </MDBBtn>{' '}
                        </a>
                        
                            <MDBBtn className='btn-sm' style={{ fontSize:'13px', fontWeight:'light'}}  color='dark' onClick={pdfDownload}>
                                All Request Report
                            </MDBBtn>{' '}
                       

                         
                     </div>
                 
                     <h5 className='mt-4' id="#Pending">Pending Request</h5>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Item Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Tel</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Supplier </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Time</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Site</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Price</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Status</h6></th>
                                
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {AllPeddingReqs.map((AllPeddingReq,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.name}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.email}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.telephone1}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.supplier}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.Date}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.Time}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.Site}</td>
                                <td style={{fontSize:'18px'}}key={AllPeddingReq._id}>{AllPeddingReq.Price}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => reject(AllPeddingReq._id)}><MDBIcon fas icon="minus-circle" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => accept(AllPeddingReq._id)}><MDBIcon fas icon="plus-circle" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                    </div>
                    <br/>
                    <br/>
                       <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'1%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <h5 className='mt-5' id="Accept">Accepted Request</h5>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Item Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Tel</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Supplier </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Time </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Site </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Price</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Status</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {AllAccept.map((Accept,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.name}</td>
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.email}</td>
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.telephone1}</td>
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.supplier}</td>
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.Date}</td>
                                <td style={{fontSize:'18px'}} key={Accept._id}>{Accept.Time}</td>
                                <td style={{fontSize:'18px'}}key={Accept._id}>{Accept.Site}</td>
                                <td style={{fontSize:'18px'}}key={Accept._id}>{Accept.Price}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => complete(Accept._id)}>COMPLETE</MDBBtn>{''}&nbsp;&nbsp;
                                 </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                        </div>
                    <br/>
                    <br/>
                    <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'1%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <h5 className='mt-5' id="Reject">Reject Request</h5>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                            <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Item Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Tel</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Supplier</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Time </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Site </h6>
                                
                                
                                </th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Price </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Status </h6>
                                
                                
                                </th>
            </tr>       
                        </MDBTableHead>
                        <MDBTableBody>
                          {AllReject.map((Reject,key) => (
                            <tr className="bg-light">
                                 <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.name}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.email}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.telephone1}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.supplier}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.Date}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.Time}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.Site}</td>
                                <td style={{fontSize:'18px'}}key={Reject._id}>{Reject.Price}</td>
                                 <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => rejectDelete(Reject._id)}>Delete</MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                        </div>
                        <br/>
                    <br/>
                    <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'1%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <h5 className='mt-5' id="Complete">Complete Request</h5>
                     <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Item Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Tel</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Supplier </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Time </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Site</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Price</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {CompleteService.map((Complete,key) => (
                            <tr className="bg-light">
                              <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.name}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.email}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.telephone1}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.supplier}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.Date}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.Time}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.Site}</td>
                                <td style={{fontSize:'18px'}} key={Complete._id}>{Complete.Price}</td>
                            </tr>
                            ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                      <br/>
                      <br/>
                      <br/>
                      <div>
                      <h5 className='mt-5' id="Reject">Shipped Request</h5>
                      <MDBTable className="mt-2" hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Item Name</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Email</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}> Tel</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Supplier </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Time </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Site </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Status </h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Price</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {AllSend.map((Sends,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.name}</td>
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.email}</td>
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.telephone1}</td>
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.supplier}</td>
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.Date}</td>
                                <td style={{fontSize:'18px'}} key={Sends._id}>{Sends.Time}</td>
                                <td style={{fontSize:'18px'}}key={Sends._id}>{Sends.Site}</td>
                                <td style={{fontSize:'18px'}}key={Sends._id}>{Sends.status}</td>
                                <td style={{fontSize:'18px'}}key={Sends._id}>{Sends.Price}</td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                      </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default ProcumentDashboard;