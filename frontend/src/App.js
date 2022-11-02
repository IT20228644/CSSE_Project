import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Admin from './pages/Admin';
import UserAdminDashboard from './pages/UserAdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';


import Register from './pages/Register';
import UserProfile from './pages/UserProfile/user.profile';
import UserProfEdit from './pages/UserProfile/user.profile.edit';

import UserPayment from './pages/payment/userPayment';
import PaymentView from './pages/payment/paymentView';



import ProcumentDashboard from './pages/procument/procumentDashboard';
import ProcumentRequest from './pages/procument/procumentReq';
import ProcumentReqEdit from './pages/procument/procumentReqEdit';

import ItemAdd from './pages/item/itemAdd';
import ItemEdit from './pages/item/itemEdit';
import ProcumentReqReport from './pages/procument/procumentReqReport';

import SiteAdd from './pages/sites/siteAdd';
import SiteEdite from './pages/sites/siteEdite';

import Supplier from './pages/suppliers/supplier.add';
import Supplier_edit from './pages/suppliers/supplier.edit';
import SupplierProfile from './pages/supplierProfile/profile';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && (<div class="spinner-parent">
        <div class="spinner-border" role="status">

        </div>
      </div>)}
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><UserAdminDashboard /></ProtectedRoute>} />
      
        <Route path='/procument_dash' element={<ProtectedRoute><ProcumentDashboard /></ProtectedRoute>} />
        <Route path='/procument_req' element={<ProtectedRoute><ProcumentRequest /></ProtectedRoute>} />
        <Route path='/procument_req_edit' element={<ProtectedRoute><ProcumentReqEdit /></ProtectedRoute>} />
        <Route path='/procument_req_report' element={<ProtectedRoute><ProcumentReqReport /></ProtectedRoute>} />

        <Route path='/sites' element={<ProtectedRoute><SiteAdd /></ProtectedRoute>} />
        <Route path='/sites_edit' element={<ProtectedRoute><SiteEdite /></ProtectedRoute>} />

        <Route path='/procument_req' element={<ProtectedRoute><ProcumentRequest /></ProtectedRoute>} />
        <Route path='/procument_req_edit' element={<ProtectedRoute><ProcumentReqEdit /></ProtectedRoute>} />
        <Route path='/procument_req_report' element={<ProtectedRoute><ProcumentReqReport /></ProtectedRoute>} />

        <Route path='/supplier_add' element={<ProtectedRoute><Supplier /></ProtectedRoute>} />
        <Route path='/supplier_edit' element={<ProtectedRoute><Supplier_edit /></ProtectedRoute>} />

        <Route path='/itemadd' element={<ProtectedRoute><ItemAdd/></ProtectedRoute>} />
        <Route path='/itemedit' element={<ProtectedRoute><ItemEdit/></ProtectedRoute>} />

        {/* User Profile */}

        
        <Route path='/supplierpro' element={<ProtectedRoute>< SupplierProfile /></ProtectedRoute>} />

        {/* payment */}

        <Route path='/Payment' element={<ProtectedRoute>< UserPayment /></ProtectedRoute>} />
        <Route path='/PaymentView' element={<ProtectedRoute>< PaymentView /></ProtectedRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
