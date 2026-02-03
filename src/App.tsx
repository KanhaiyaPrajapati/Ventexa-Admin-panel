

import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast"; // ✅ IMPORT TOASTER

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import ServiceFeatures from "./pages/Tables/Service-Features/ServiceFeatures"; 
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
<<<<<<< HEAD
import BasicTables from "./pages/Tables/BasicTables";
import ContactLeads from "../src/pages/Tables/ContactLeads/ContactLeads";
=======
// import BasicTables from "./pages/Tables/BasicTables";
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProcessStepsTable from "./pages/Tables/ProcessStepsTable"
// import BasicTables from "./pages/Tables/ProcessStepsTable";
import BasicTables from "./pages/Tables/BasicTables";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
<<<<<<< HEAD

=======
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
            <Route path="/form-elements" element={<FormElements />} />

            <Route path="/basic-tables" element={<BasicTables />} />
<<<<<<< HEAD
            <Route path="/contact-leads" element={<ContactLeads />} />

=======
            <Route path="/process-steps" element={<ProcessStepsTable />} /> 

            {/* Ui Elements */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/service-features" element={<ServiceFeatures />} />

            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

<<<<<<< HEAD
          {/* Auth */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* 404 */}
=======
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* ✅ TOASTER GOES HERE (OUTSIDE ROUTER) */}
      <Toaster position="top-right" />
    </>
  );
<<<<<<< HEAD
}



=======
}
>>>>>>> 2569b38340278d1d83714839fa6874d00038de19
