
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody,MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

function SiteAdd() {

      const [location, setLocation] = useState("");
      const [name, setName] = useState("");
      const [address, setAddress] = useState("");
      const [telephone, setTelephoneOne] = useState("");
  
      const [email, setEmail] = useState("");
     
      const [isValidCFpassword, setIsValidCfpassword] = useState(false);
      const [emailStatus, setemailStatus] = useState('');

      function set_Email(e) {
        const email_pre = e;
        var atposition=email_pre.indexOf("@");  
        var dotposition=email_pre.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email_pre.length){  
                    setemailStatus('InValid Email');
                    setIsValidCfpassword(false);
        }else{
                    setIsValidCfpassword(true);
                    setemailStatus('Valid Email');
            }   

          setEmail(e); 
      }

      const [sites,setSites] = useState([]);
      
 

    
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
                axios.get("http://localhost:5000/sites/allSites")
                .then(res => setSites(res.data))
                .catch(error => console.log(error));
                },[]);
       
       
        

      function Save(e){
            e.preventDefault();
             

            const addSite ={ location ,name, address , telephone , email  }

            axios.post("http://localhost:5000/sites/addSite",addSite).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Site Added!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/sites";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Site Not Added!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
        
      }

    function pdfDownload()
    { 
        const input = document.getElementById('divToPrint');
        html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
              
            pdf.setTextColor(254, 8, 8 );
            pdf.text(20, 20, 'Sites List')
            pdf.addImage(imgData, 'JPEG', 10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("site.pdf");
        });
    }

    
    function remove(location)
    { 
        axios.delete("http://localhost:5000/sites/deleteSite/"+location).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Site Deleted",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Site Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function edit(_id, location ,name, address , telephone , email)
    {
        reactLocalStorage.setObject("service_center", [_id, location ,name, address , telephone , email]);
        window.location.href = "/sites_edit";
    }



    const searchHandle = async(e) =>{
        const key =e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/sites/search/${key}`);
            result = await result.json()
           
            if(result){
                setSites(result)
            }
        }else{
           let result = await fetch(`http://localhost:5000/sites/allSites`)
            result = await result.json()
            if(result){
                setSites(result)
            }
        }
       
    }

    return (
    <Layout>
    <div class="dashboard-main-wrapper" >
     
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                         <h3 className="text-uppercase">All SITES</h3>
                     </center>

                     <div class="alert alert-dark mt-3 mb-3 text-left" role="alert">
                            <h5 className="text-uppercase" style={{letterSpacing:'2px',textAlign: "left"}}>Total Number of Rergisterd SITES : {sites.length}</h5>
                        </div>

                      <MDBRow className='mt-3'>
                        <MDBCol sm='15'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody id="divToPrint">
                                <div className='text-end'>
                                    <button type="button" class="btn btn-dark d-letter-spacing "  onClick={pdfDownload} ><MDBIcon fas icon="download" /></button>
                                </div>
                                <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} outline color='dark' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Add new SITES
                            </MDBBtn>
                                <div class="mb-3 mt-4">
                                    <h6>Search Location</h6>
                                    <MDBInput  className="mt-3 bg-white" id='form1' type='text' placeholder="Search Locations"  onChange={searchHandle}/>
                                </div>
                               <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                         <th scope='col' className="text-white d-letter-spacing h6">Location</th>
                                         <th scope='col' className="text-white d-letter-spacing h6">Telephone number</th>
                                         <th scope='col' className="text-white d-letter-spacing h6 text-center">Status</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                       {sites.map((site,key) => (
                                            <tr className="bg-light">
                                                <td>
                                                    <h6>
                                                        {site.location}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6>
                                                        {site.telephone}
                                                    </h6>
                                                </td>
                                                <td className="text-center">
                                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(site.location)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                    <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => edit( site._id, site.location,site.name, site.address, site.telephone, site.email)}><MDBIcon fas icon="edit" /></MDBBtn>{''}&nbsp;&nbsp;
                                                </td>
                                            </tr>
                                       ))}
                                </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                       
                        
                        </MDBRow>
                 </div>
            </div>
        </div>









        <div class="modal fade bg-light" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered  modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark">
                                            <h3 class="modal-title text-white d-letter-spacing" id="staticBackdropLabel">Add New Site</h3>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                        </div>
                                        <div class="modal-body  p-4">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">

                                                            

                                                        <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Location</label>
                                    <input type="text" class="form-control" placeholder="Enter Location" onChange={(e) =>{
                                            setLocation(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Name</label>
                                    <input type="text" class="form-control" placeholder="Enter Name" onChange={(e) =>{
                                            setName(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Address</label>
                                    <input type="text" class="form-control" placeholder="Enter Address" onChange={(e) =>{
                                            setAddress(e.target.value);
                                        }} />
                                </div>
                                
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Telephone Number 1</label>
                                    <NumberFormat format="0## ### ####" class="form-control"  placeholder="0## ### ## ##" onChange={(e) =>{
                                                setTelephoneOne(e.target.value);
                                    }}/>
                                   
                                </div>

                                                          

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">
                                                         
                                                        
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                    <input type="email" class="form-control" placeholder="Enter Email Address" onChange={(e) =>{
                                            set_Email(e.target.value);
                                    }} />
                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {emailStatus}
                                    </span>
                                </div>
                            

                                                           

                                                         
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer border-0">
                                            <button type="button" class="btn btn-outline-dark" style={{fontSize:"15px"}} data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-success d-letter-spacing " onClick={Save} >Save</button>&nbsp;&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>










      </div>
      </Layout>
      )
};


export default SiteAdd;