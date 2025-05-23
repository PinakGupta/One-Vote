
import Login from "./Components/Login";
import ForgetPass from "./Components/ForgetPass";
import Register from "./Components/Register";
import OTPVerification from "./Components/OTPVerification";
import Home from "./Home/Home";
import Profile from "./Components/Profile";
import React from "react";
import { useState, useEffect } from "react";
import { userContext } from "./context.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPass from "./Components/NewPass";
import { candidateContext } from "./context.js";
import CandidateList from "./Components/CandidateList.jsx";
import SpecificCandidate from "./Components/SpecificCandidate.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import ProfileUpdate from "./Components/ProfileUpdate.jsx";
import UpdatePassword from "./Components/UpdatePassword.jsx";
import AdminHome from "./Components/Admin/AdminHome.jsx";
import UpdateCandidate from "./Components/Admin/updateCandidate.jsx";
import AddCandidate from "./Components/Admin/AddCandidate.jsx";
import DeleteCandidate from "./Components/Admin/DeleteCandidate.jsx";
import ViewVoteCount from "./Components/Admin/ViewVoteCount.jsx";
import UpdateCandidateForm from "./Components/Admin/UpdateCandidateForm.jsx";
import ViewCandidates from "./Components/Admin/ViewCandidates.jsx";
import CandidateDetails from "./Components/Admin/CandidateDetails.jsx";
import AdminResultsToggle from "./Components/Admin/AdminResultsToggle.jsx";
import UserVoteResults from "./Components/UserVoteResults.jsx";
import RoleSelector from "./Components/RoleSelector.jsx";
import ElectionCreation from "./Components/Admin/ElectionCreation.jsx";
import CreateElectionForm from "./Components/Admin/CreateElectionForm.jsx";
import AddVoters from "./Components/Admin/AddVoters.jsx";
import ElectionIdForm from "./Components/ElectionIdForm.jsx"; // Import the new component
import ViewCandidateDetails from "./Components/Admin/ViewCandidateDetails.jsx";
import ElectionResultIdForm from "./Components/ElectionResultIdForm.jsx";
import ElectionResult from "./Components/ElectionResult.jsx";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [visitorType, setWhoTheVisitor] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [userData, setUserData] = useState("");

  const updateUserData = (value) => {
    setUserData(value);
  };
  const changeVisitorType = (value) => {
    setWhoTheVisitor(value);
  };
  const updateCandidateId = (value) => {
    setCandidateId(value);
  };
  const updateVisitorId = (value) => {
    setVisitorId(value);
  };

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <userContext.Provider
            value={{
              visitorType,
              changeVisitorType,
              visitorId,
              updateVisitorId,
              userData,
              updateUserData,
            }}
          >
            <candidateContext.Provider value={{ candidateId, updateCandidateId }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/role-selector" element={<RoleSelector />} />
                <Route path="/api/v1/auth/login" element={<Login />} />
                <Route path="/:id" element={<Home />} />
                <Route path="/api/v1/auth/register" element={<Register />} />
                {/* Add new route for OTP verification */}
                <Route path="/api/v1/otp/verify" element={<OTPVerification />} />
                <Route
                  path="/api/v1/auth/login/forget-password"
                  element={<ForgetPass />}
                />
                <Route
                  path="/api/v1/auth/login/forget-password/create-new-password/:id"
                  element={<NewPass />}
                />
                {/* New route for Election ID form */}
                <Route
                  path="/:id/api/v1/candidates/enter-election"
                  element={<ElectionIdForm />}
                />
                {/* Updated CandidateList route to include electionId */}
                <Route
                  path="/:id/api/v1/candidates/:electionId/candidate-list"
                  element={<CandidateList />}
                />
                <Route
                  path="/:id/declare-result"
                  element={<UserVoteResults />}
                />
                <Route
                   path="/:userId/enter-result"
                   element={<ElectionResultIdForm />}
                 />
                 <Route
                   path="/:userId/api/v1/election/:electionId/result"
                   element={<ElectionResult />}
                 />
                <Route
                  path="/:id/api/v1/candidates/candidate-list/:electionId/:candidateId"
                  element={<SpecificCandidate />}
                />
                <Route
                  path="/:id/api/v1/user/profile"
                  element={<Profile />}
                />
                <Route
                  path="/:id/api/v1/user/profile/update"
                  element={<ProfileUpdate />}
                />
                <Route
                  path="/:id/api/v1/user/profile/update/password"
                  element={<UpdatePassword />}
                />
                <Route
                  path="/admin/:id/election"
                  element={<ElectionCreation />}
                />
                <Route
                  path="/admin/:id/create-election"
                  element={<CreateElectionForm />}
                />
                <Route
                  path="/admin/:id/election/:electionId/add-voters"
                  element={<AddVoters />}
                />
                <Route
                  path="/admin/:id/election/:electionId"
                  element={<AdminHome />}
                />
                <Route
                  path="/admin/:adminId/election/:electionId/add-candidate/"
                  element={<AddCandidate />}
                />
                <Route
                  path="/admin/:adminId/election/:electionId/view-candidates"
                  element={<ViewCandidates />}
                />
                <Route
                  path="/admin/:adminId/election/:electionId/candidate/:candidateId"
                  element={< ViewCandidateDetails/>}
                />
                  <Route
                    path="candidate/:candidateId"
                    element={<CandidateDetails />}
                  />
                <Route
                  path="/admin/:id/election/:electionId/delete-candidate"
                  element={<DeleteCandidate />}
                />
                <Route
                  path="/admin/:id/election/:electionId/update-candidate"
                  element={<UpdateCandidate />}
                />
                <Route
                  path="/admin/:id/election/:electionId/view-count"
                  element={<ViewVoteCount />}
                />
                <Route
                  path="/admin/:adminId/election/:electionId/candidate/:candidateId/update"
                  element={<UpdateCandidateForm />}
                />
                <Route
                  path="/admin/:id/election/:electionId/results-toggler"
                  element={<AdminResultsToggle />}
                />
              </Routes>
            </candidateContext.Provider>
          </userContext.Provider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;