import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Layout
import Login from './page/pageCustomer/Login.jsx';
import StaffApp from './layout/StaffApp.jsx';
import CustomerApp from './layout/CustomerApp';
import AdminApp from './layout/AdminApp.jsx';
import ValuationApp from './layout/ValuationApp.jsx';
// Staff Pages

import { UserRequest } from "./page/pageStaff/Request/UserRequest.jsx";
import { ViewReciptList } from "./page/pageStaff/ViewReciptListApplication/ViewReciptList.jsx";
import { CreateReceipt } from "./page/pageStaff/ReciptApplication/CreateRecipt.jsx";
import CreateCommitment from "./page/pageStaff/Commitment/CreateCommitment.jsx";
import { PersonalInformation } from "./page/pageStaff/PersonalInformation";
import { ValuationApplication } from "./page/pageValuationStaff/ValuationApplication/ValuationApplication.jsx";
import { ReceiptDetails } from "./page/pageStaff/ReciptApplication/ReciptDetails.jsx";
import { ValuationList } from "./page/pageValuationStaff/ValuationApplication/ValuationList.jsx";
import { ValuationOrderDetailUpdate } from "./page/pageStaff/ValuationOrderDetailUpdate.jsx";
import { ViewCertificate } from "./page/pageStaff/ReciptApplication/ViewCertificate.jsx";
import { MyCertificateList } from "./page/pageValuationStaff/ValuationApplication/MyCertificateList.jsx";
import { CertificateDetail } from "./page/pageValuationStaff/ValuationApplication/CertificateDetail.jsx";
// Customer Pages
import HomeCustomer from "./page/pageCustomer/HomeCustomer.jsx";
import Signup from "./page/pageCustomer/Signup";
import Blog from "./page/pageCustomer/Blog";
import Contact from "./page/pageCustomer/Contact";
import EvaluationServicePage from "./page/pageCustomer/EvaluationServicePage";
import Calculate from "./page/pageCustomer/Calculate/Calculate.jsx";
import Check from "./page/pageCustomer/Check";
import { PersonalRequest } from "./page/pageCustomer/PersonalRequest";
import { ValuationOrderDetail } from "./page/pageStaff/ValuationOrderDetail.jsx";
// Admin Pages
import { DashBoard } from "./page/pageAdmin/dashBoard/dashBoard.jsx";
import { ManageCustomer } from "./page/pageAdmin/ManageCustomer/ManageCustomer.jsx";
import { ManageStaff } from "./page/pageAdmin/ManageStaff/ManageStaff.jsx";
import { ManageSchedule } from "./page/pageAdmin/ManageSchedule/ManageScheldule.jsx";
import { PersonalRequestDetail } from "./page/pageCustomer/PersonalRequestDetail.jsx";
import { GuestGuard } from "./guards/GuestGuard.jsx";
import { AuthGuard } from "./guards/AuthGuard.jsx";
import { RoleBasedGuard } from "./guards/RoleBasedGuard.jsx";
import CommitmentList from "./page/pageStaff/Commitment/CommitmentList.jsx";
import CommitmentDetail from "./page/pageStaff/Commitment/CommitmentDetail.jsx";
import { CustomerGuard } from "./guards/CustomerGuard.jsx";
import CheckDiamond from './page/pageCustomer/CheckDiamond/CheckDiamond.jsx';
import DetailDiamondCheck from './page/pageCustomer/CheckDiamond/DetailDiamondCheck.jsx';
import ServicePolicy from './page/pageCustomer/ServicePolicy.jsx';
import { ManageService } from './page/pageAdmin/MangeService/ManageService.jsx';


function App() {

  return (
    <BrowserRouter>
    <Routes>
        {/* ROLES: CUSTOMER OR GUEST */}
        <Route
          element={
            <CustomerGuard>
              <CustomerApp />
            </CustomerGuard>
          }
        >
          <Route path="/" element={<HomeCustomer />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route
          element={
            <CustomerGuard>
              <AuthGuard>
                <CustomerApp />
              </AuthGuard>
            </CustomerGuard>
          }
        >
          <Route path="evaluationservice" element={<EvaluationServicePage />} />
          <Route path="my-request" element={<PersonalRequest />} />
          <Route
            path="my-request/:requestId"
            element={<PersonalRequestDetail />}
          />
        </Route>

        {/* ROLE:GUEST*/}
        <Route element={<CustomerApp />}>
          <Route
            path="login"
            element={
              <GuestGuard>
                <Login />
              </GuestGuard>
            }
          />
          <Route
            path="signup"
            element={
              <GuestGuard>
                <Signup />
              </GuestGuard>
            }
          />
          <Route path="calculate" element={<Calculate />} />
          <Route path="check" element={<Check />} />
          <Route path="checkDiamond" element={<CheckDiamond />} />
          <Route path="inforcheck/:assess_id" element={<DetailDiamondCheck />} />
          <Route path="policy" element={<ServicePolicy />} />
        </Route>

        {/* ROLE: CONSULTANT_STAFF */}
        <Route path="/staff" element={
          <AuthGuard>
            <RoleBasedGuard roles={'consultant_staff'}>
              <StaffApp />
            </RoleBasedGuard>
          </AuthGuard>
        }>
          <Route index element={<UserRequest />} />
          {/* <Route path="home" element={<HomeStaff />} /> */}
          <Route path="user-request" element={<UserRequest />} />
          <Route path="view-receipt" element={<ViewReciptList />} />
          <Route path="view-receipt/:orderId" element={<ReceiptDetails />} />
          <Route path="view-certificate/:orderDetailId" element={<ViewCertificate />} />
          <Route path="create-receipt" element={<CreateReceipt />} />
          <Route path="commitment" element={<CreateCommitment />} />
          <Route path="commitment-list" element={<CommitmentList />} />
          <Route
            path="commitment-list/:committedId"
            element={<CommitmentDetail />}
          />
          <Route path="personal-info" element={<PersonalInformation />} />
          <Route path="valuation-result-list" element={<ValuationList />} />

        </Route>
        {/* ROLE:VALUATION_STAFF */}
        <Route path="/valuation-staff" element={
          <AuthGuard>
            <RoleBasedGuard roles={'valuation_staff'}>
              <ValuationApp />
            </RoleBasedGuard>
          </AuthGuard>
        }>
          <Route index element={<ValuationOrderDetail />} />
          <Route path="valuation-order" element={<ValuationOrderDetail />} />
          <Route path="valuation-order/:orderDetailId" element={<ValuationOrderDetailUpdate />} />
          <Route path="valuation" element={<ValuationApplication />} />
          <Route path="certificate-list" element={<MyCertificateList />} />
          <Route
            path="certificate-list/:evaluationResultId"
            element={<CertificateDetail />}
          />
        </Route>
        <Route path="/admin" element={
          <AuthGuard>
            <RoleBasedGuard roles={'admin'}>
              <AdminApp />
            </RoleBasedGuard>
          </AuthGuard>
        }>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="managecustomer" element={<ManageCustomer />} />
          <Route path="managestaff" element={<ManageStaff />} />
          <Route path="manageschedule" element={<ManageSchedule />} />
          <Route path="manageservice" element={<ManageService />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;