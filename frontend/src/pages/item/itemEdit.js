
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardImage} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

function ItemEdit() {
      var items_local = reactLocalStorage.getObject('items_local');
      const id = items_local[0];

      const [name, setName] = useState(items_local[1]);
      const [price, setPrice] = useState(items_local[2]);
      const [brand, setBrand] = useState(items_local[3]);
      const [quantity, setQuantity] = useState(items_local[4]);
    
     
  
      

      const [image, setImage] = useState('https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/'+items_local[5]);

      function Edit(e){
            e.preventDefault();
            const Service_centerUpdate ={ name , price ,brand,quantity, image  }

            axios.put("http://localhost:5000/itemadd/ItemUpdate/"+id,Service_centerUpdate).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Item Updated!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/itemAdd";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Item Not Update!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }



    function pdfDownload(){
        var doc = new jsPDF();
    
        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, name)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Item Name : '+name)
        doc.text(25, 50, 'Item Price : '+price)
        doc.text(25, 60, 'Brand quantity : '+quantity)
      
      
        doc.save(name+'.pdf')
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
                         <h3 className="text-uppercase">Edit Items Details </h3>
                     </center>
                      <MDBRow className='mt-3'>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                        
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody  className="bg-light">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Item</label>
                                    <input type="text" class="form-control"   value={name} onChange={(e) =>{
                                            setName(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Price</label>
                                    <input type="text" class="form-control" value={price} onChange={(e) =>{
                                            setPrice(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Quantity</label>
                                    <input type="text" class="form-control" value={quantity} onChange={(e) =>{
                                            setQuantity(e.target.value);
                                        }} />
                                </div>
                           
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Brand</label>
                                    <input type="text" class="form-control" value={brand} onChange={(e) =>{
                                            setBrand(e.target.value);
                                        }} />
                                </div>
                                 <div className="text-end">
                                     <button type="button" class="btn btn-dark d-letter-spacing " onClick={Edit} >Edit</button>&nbsp;&nbsp;&nbsp;
                                    {/* <button type="button" class="btn btn-success d-letter-spacing " onClick={pdfDownload} >Print</button>&nbsp;&nbsp;&nbsp; */}
                                     <a href="/itemAdd">
                                        <MDBBtn className='btn-sm' outline style={{ fontSize:'15px', fontWeight:'500',letterSpacing:'2px' }} color='dark'>
                                            Back
                                        </MDBBtn>
                                     </a>
                                     &nbsp;&nbsp;&nbsp;
                                     <button type="button" class="btn btn-dark d-letter-spacing "  onClick={pdfDownload} ><MDBIcon fas icon="download" /></button>
                                  
                             
                                 </div>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        </MDBRow>
                 </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default ItemEdit;