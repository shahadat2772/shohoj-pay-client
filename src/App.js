import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Authentication/Login/Login";
import NotFound from "./Components/Shared/NotFound/NotFound";
import SignUp from "./Components/Pages/Authentication/SignUp/SignUp";
import toast, { Toaster } from "react-hot-toast";
import ResetPassword from "./Components/Pages/Authentication/ResetPassword/ResetPassword";
import Services from "./Components/Pages/Services/Services/Services";
import AddMoney from "./Components/Pages/Services/AddMoney/AddMoney";
import Settings from "./Components/Pages/Settings/Settings";
import SendMoney from "./Components/Pages/Services/SendMoney/SendMoney";
import SaveMoney from "./Components/Pages/Services/SaveMoney/SaveMoney";
import RequireAuth from "./Components/Pages/Authentication/RequireAuth/RequireAuth";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import RequestMoney from "./Components/Pages/Services/RequestMoney/RequestMoney";
import AllTransaction from "./Components/Pages/Dashboard/AllTransaction";
import MoneyRequests from "./Components/Pages/Services/MoneyRequests/MoneyRequests";
import MessengerCustomerChat from "react-messenger-customer-chat";
import MoneyRequestConfirmModal from "./Components/Pages/Services/RequestMoney/MoneyRequestConfirmModal";
import { useEffect, useState } from "react";
import RequireAdmin from "./Components/Pages/Authentication/RequireAdmin/RequireAdmin";
import MakeAdmin from "./Components/Pages/Admin/MakeAdmin";
import AdminPanel from "./Components/Pages/Admin/AdminPanel";
import RequirePersonal from "./Components/Pages/Authentication/RequirePersonal/RequirePersonal";
import RequireMerchant from "./Components/Pages/Authentication/RequireMerchant/RequireMerchant";
import useUser from "./Components/Pages/Hooks/useUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./firebase.init";
import Spinner from "./Components/Shared/Spinner/Spinner";
import RestrictAuth from "./Components/Pages/Authentication/RestrictAuth/RestrictAuth";
import axios from "axios";
import Notification from "./Components/Pages/Notificaion/Notification";
import ECheck from "./Components/Pages/Services/ECheck/ECheck";
import AdminSummary from "./Components/Pages/Admin/AdminSummary/AdminSummary";
import MerchantServices from "./Components/Pages/Merchant/MerchantServices/MerchantServices";
import MerchantToPersonal from "./Components/Pages/Merchant/MerchantServices/MerchantToPersonal";
import ManageAdmin from "./Components/Pages/Admin/ManageAdmin";
function App() {
  // State for confirming the money request
  const [requestForConfirm, setRequestForConfirm] = useState([]);
  const [request, fetchRequests] = requestForConfirm;
  const [firebaseUser, loading] = useAuthState(auth);
  const [user] = useUser(firebaseUser?.email);

  // Notification
  const [allNotification, setAllNotification] = useState([]);
  const [unseenNotification, setUnseenNotification] = useState([]);
  const fetchNotification = () => {
    const email = user.email;
    if (!email) {
      return;
    }
    try {
      axios
        .get("http://localhost:5000/getNotification", {
          headers: {
            email: email,
          },
        })
        .then((res) => {
          const [all, unseen] = res.data;
          setAllNotification(all.reverse());
          setUnseenNotification(unseen);
        });
    } catch (error) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetchNotification();
    }
  }, [user]);

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar unseenNotification={unseenNotification}></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictAuth>
              <Home />
            </RestrictAuth>
          }
        />
        <Route
          path="/services"
          element={
            <RequireAuth>
              <RequirePersonal>
                <Services />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/notification"
          element={
            <RequireAuth>
              <Notification
                fetchNotification={fetchNotification}
                allNotification={allNotification}
                unseenNotification={unseenNotification}
                setUnseenNotification={setUnseenNotification}
              />
            </RequireAuth>
          }
        />
        {/* Pages for each services */}
        <Route
          path="/services/addMoney"
          element={
            <RequireAuth>
              <RequirePersonal>
                <AddMoney />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        <Route
          path="/services/sendMoney"
          element={
            <RequireAuth>
              <RequirePersonal>
                <SendMoney />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        <Route
          path="/services/eCheck"
          element={
            <RequireAuth>
              <RequirePersonal>
                <ECheck />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        <Route
          path="/services/saveMoney"
          element={
            <RequireAuth>
              <RequirePersonal>
                <SaveMoney />
              </RequirePersonal>
            </RequireAuth>
          }
        />

        <Route
          path="/moneyRequests"
          element={
            <RequireAuth>
              <RequirePersonal>
                <MoneyRequests setRequestForConfirm={setRequestForConfirm} />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        <Route
          path="/services/requestMoney"
          element={
            <RequireAuth>
              <RequirePersonal>
                <RequestMoney />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            <RestrictAuth>
              <Login />
            </RestrictAuth>
          }
        />
        <Route
          path="/signUp"
          element={
            <RestrictAuth>
              <SignUp />
            </RestrictAuth>
          }
        />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Dashboard related routes  */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <RequirePersonal>
                <Dashboard />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/adminpanel"
          exact={true}
          element={
            <RequireAuth>
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            </RequireAuth>
          }
        >
          <Route
            path="/adminpanel/summary"
            element={
              <RequireAdmin>
                <AdminSummary />
              </RequireAdmin>
            }
          />
          <Route
            path="/adminpanel/makeadmin"
            element={
              <RequireAdmin>
                <ManageAdmin />
              </RequireAdmin>
            }
          />
        </Route>
        <Route
          path="/dashboard/allTransAction"
          element={
            <RequireAuth>
              <RequirePersonal>
                <AllTransaction />
              </RequirePersonal>
            </RequireAuth>
          }
        />
        {/* Routes for Merchant */}
        <Route
          path="/merchant/money-requests"
          element={
            <RequireAuth>
              <RequireMerchant>
                <MoneyRequests />
              </RequireMerchant>
            </RequireAuth>
          }
        />
        <Route
          path="/merchant/dashboard"
          element={
            <RequireAuth>
              <RequireMerchant>
                <Dashboard />
              </RequireMerchant>
            </RequireAuth>
          }
        />
        <Route
          path="/merchant/services"
          element={
            <RequireAuth>
              <RequireMerchant>
                <MerchantServices />
              </RequireMerchant>
            </RequireAuth>
          }
        />
        <Route
          path="/merchant/services/add-money"
          element={
            <RequireAuth>
              <RequireMerchant>
                <AddMoney />
              </RequireMerchant>
            </RequireAuth>
          }
        />
        <Route
          path="/merchant/services/merchant-to-personal"
          element={
            <RequireAuth>
              <RequireMerchant>
                <MerchantToPersonal />
              </RequireMerchant>
            </RequireAuth>
          }
        />

        {/* Notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MessengerCustomerChat pageId="107012672117270" appId="586701279704824" />
      ,
      <Footer />
      <Toaster />
      {request && (
        <MoneyRequestConfirmModal
          setRequestForConfirm={setRequestForConfirm}
          requestInfo={request}
          fetchRequests={fetchRequests}
        />
      )}
    </div>
  );
}

export default App;
