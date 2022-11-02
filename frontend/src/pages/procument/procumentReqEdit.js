import React, { useState, useEffect } from 'react';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';



import Layout from '../../components/Layout.js';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
function ProcumentReqEdit() {

    var BookingEdit = reactLocalStorage.getObject('BookingEdit');
    const id = BookingEdit[0];

    const [name, setName] = useState(BookingEdit[1]);
    const [email, setEmail] = useState(BookingEdit[2]);
    const [telephone1, setPhone] = useState(BookingEdit[3]);
    const [supplier, setSupplier] = useState(BookingEdit[4]);
    const [Date, setDate] = useState(BookingEdit[5]);
    const [Time, setTime] = useState(BookingEdit[6]);
    const [Site, setSite] = useState(BookingEdit[7]);
    const { user } = useSelector((state) => state.user)
    const userName = user?.name
    const [Sites, setSites] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/sites/allSites")
            .then(res => setSites(res.data))
            .catch(error => console.log(error));
    }, []);


    const [Requests, setRequests] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/stockReq/allreqests/" + userName)
            .then(res => setRequests(res.data))
            .catch(error => console.log(error));
    }, []);


    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/supplier/allSuppliers")
            .then(res => setSuppliers(res.data))
            .catch(error => console.log(error));
    }, []);

    function Edit(e) {
        e.preventDefault();

        const reqEdit = { name, email, telephone1, supplier, Date, Time, Site }

        axios.put("http://localhost:5000/stockReq/editreqest/" + id, reqEdit).then(() => {

            Swal.fire({
                title: "Success!",
                text: "reqest Edit Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/procument_req";
                }
            });
        }).catch((err) => {

            Swal.fire({
                title: "Error!",
                text: "reqest Edit Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }





    function pdfDownload() {
        var doc = new jsPDF();

        doc.setTextColor(254, 8, 8);
        doc.text(20, 20, ' Your Recipt,' + name)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Site manager name : ' + name)
        doc.text(25, 50, 'Site manager email: ' + email)
        doc.text(25, 60, 'Site manager Telephone number : ' + telephone1)
        doc.text(25, 70, 'supplier name  : ' + supplier)
        doc.text(25, 80, 'Time  : ' + Time)
        doc.text(25, 90, 'Site location : ' + Site)
        doc.save(name + '.pdf')
    }


    return (
        <Layout>
            <div>


                <div className='bg-image' >
                    <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
                    <div className='mask' style={{ backgroundColor: '#292929' }}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Procument req Edit</p>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <center>
                    <div class="row container-fluid" style={{ marginTop: '7%', marginBottom: '26%' }}>
                        <div class="col-sm-3">

                        </div>
                        <div class="col-sm-6">
                            <div class="card shadow-0 bg-light">
                                <div class="card-body text-left">
                                    <center>
                                        <h4 className="mt-4">Edit Request</h4>
                                    </center>
                                    <div class="mb-3">
                                        <label class="form-label h5">Name</label>
                                        <input type="text" value={name} class="form-control" onChange={(e) => {
                                            setName(e.target.value);
                                        }} />
                                    </div>






                                    <div class="mb-3">
                                        <label class="form-label h5">Suppliers</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                            setSupplier(e.target.value);
                                        }}>
                                            <option selected>Select supplier</option>
                                            {suppliers.map((supplier1, key) => (
                                                <option value={supplier1.name}>{supplier1.name}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div class="mb-3">
                                        <label class="form-label h5">Email</label>
                                        <input type="email" class="form-control" value={email} className="form-control" onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label h5">Phone Number</label>
                                        <input type="tel" class="form-control" value={telephone1} onChange={(e) => {
                                            setPhone(e.target.value);
                                        }} />
                                    </div>



                                    <div class="mb-3">
                                        <label class="form-label h5" style={{ fontSize: "20px" }}>Time</label>
                                        <select class="form-select" aria-label="Default select example" style={{ fontSize: "17px" }} onChange={(e) => {
                                            setTime(e.target.value);
                                        }}>

                                            {Requests.map((Request, key) => (
                                                <option value={Request.Time} disabled>previously selected time:{Request.Time}</option>

                                            ))}
                                            <option value="9am">9</option>
                                            <option value="10am">10</option>
                                            <option value="11am">11</option>
                                            <option value="12am">12</option>
                                            <option value="13pm">13</option>
                                            <option value="14pm">14</option>
                                            <option value="15pm">15</option>
                                            <option value="16pm">16</option>
                                            <option value="17pm">17</option>
                                        </select>
                                    </div>



                                    <div class="mb-3">
                                        <label class="form-label h5" style={{ fontSize: "20px" }}>Date</label>
                                        <input type="date" class="form-control" style={{ fontSize: "17px" }} onChange={(e) => {
                                            setDate(e.target.value);
                                        }} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label h5">Site</label>
                                        <select class="form-select" aria-label="Default select example" onChange={(e) => {
                                            setSite(e.target.value);
                                        }}>
                                            <option selected>Select Site</option>
                                            {Sites.map((Site, key) => (
                                                <option value={Site.location}>{Site.location}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="mb-3 text-right">
                                        <button type="button" class="btn btn-dark d-letter-spacing" onClick={Edit}>Edit</button>&nbsp;&nbsp;&nbsp;
                                        <a href="serviceBooking">
                                            <button type="button" class="btn btn-outline-dark d-letter-spacing" >Back</button>
                                        </a>
                                        <div className='text-end'>
                                            <button type="button" class="btn btn-dark d-letter-spacing " onClick={pdfDownload} ><MDBIcon fas icon="download" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">

                        </div>
                    </div>
                </center>

            </div>
        </Layout>
    )
};

export default ProcumentReqEdit;