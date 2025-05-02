import React, { useContext, useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import api from "../axiosInstance";
import { server } from "../server";
import { Link, useParams } from "react-router-dom";
import "../Styles/CandidateList.css";
import { userContext } from "../context";

function CandidateList() {
  const { visitorType } = useContext(userContext);
  const [err, setErr] = useState("");
  const { id, electionId } = useParams();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getCandidateList();
  }, [electionId]);

  const getCandidateList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(
        `${server}/admin/election/${electionId}/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      setCandidates(response.data.data.candidates || []);
    } catch (err) {
      setErr(err.response?.data?.message || err.message || "Error fetching candidates");
    }
  };

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => setErr(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  return (
    <div className="candidateList flex flex-col">
      {err && (
        <div className="errorField bg-red-100 text-red-700 p-4 rounded mb-4 text-center shadow">
          {err}
        </div>
      )}

      <div className="heading-candidate flex justify-between flex-col gap-5">
        <div className="onlyHeadings flex gap-10 flex-col">
          <p className="subheading text-2xl md:text-3xl lg:text-4xl font-extrabold">
            Choose your Candidate
          </p>
          <p className="text-lg sm:text-xl">
            Choose your candidate considering the Rules and Regulation
          </p>
        </div>
        <div className="backButton">
          <button
            type="button"
            id="back"
            className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
          >
            <Link to={`/${id}`} state={{ visitorType }}>
              <span>&lt; Back</span>
            </Link>
          </button>
        </div>
      </div>

      <div className="listItems grid gap-[80px] sm:grid-cols-3 grid-cols-2">
        {candidates.length <= 0 && "No Candidates are Registered Yet"}
        {candidates.length > 0 &&
          candidates.map((candidate) => (
            <div className="cardContainer" key={candidate.candidateId}>
              <CandidateCard
                partyName={candidate.partyName}
                candidateImage={candidate.photoUrl}
                candidateName={candidate.candidateName}
                link={`/${id}/api/v1/candidates/candidate-list/${electionId}/${candidate.candidateId}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CandidateList;
