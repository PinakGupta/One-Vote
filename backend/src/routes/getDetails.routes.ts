
// this is just to understand how can i get the data from a specific collection. So for that we will create a route to access the data and doing it more clearly we use a controller for admin 

import { Router } from 'express'
import { getAdminDetails, getElectionsByAdmin } from "../controllers/getAdminData.controller"
import { getStateDistrictsData } from "../controllers/getStateDistrict.controller"
import {  getCandidate, getSpecificCandidate } from '../controllers/candidates.controller'
import { verifyJwt } from '../middlewares/auth.middleware'
import { voteCandidate } from '../controllers/users.controller'
import { getCandidateVoteCount,getResultsVisibility, getCandidatesByElection  } from '../controllers/getCandidateVoteCount.controller'
import { deleteCandidate, getElectionCandidateVoteCount, getElectionResultsVisibility, toggleResultsVisibility, updateCandidate } from '../controllers/elections.controller'
import { upload } from '../middlewares/multer.middleware'
const router = Router()

// GET admin Data
router.route('/admin-data').get(getAdminDetails)
router.route('/view-count').get(getCandidateVoteCount);

router.route('/election/:electionId/vote-count').get(getElectionCandidateVoteCount);
router.route('/election/:electionId/toggle-results').patch(toggleResultsVisibility);
router.route('/election/:electionId/results-visibility').get(getElectionResultsVisibility);

// Other election routes

// New route to get candidates by electionId
router.route('/election/:electionId/candidates').get(getCandidatesByElection);
router.route('/election/:electionId/candidates/:candidateId').delete(deleteCandidate);
// router.route('/:id/toggle-results').patch(verifyJwt,toggleResultsVisibility);
router.route('/election/:electionId/candidates/:candidateId').patch(
    verifyJwt,
    upload.single('avatar'), // Handle single file upload for avatar
    updateCandidate
  );
router.route('/results-visibility').get(getResultsVisibility);
router.route('/:adminId/get-elections').get(getElectionsByAdmin);


// GET District State List
router.route('/district-state').get(getStateDistrictsData)
// GET Candidates List
router.route('/').get(verifyJwt,getCandidate)
// GET a specific Candidate
router.route('/:id').get( verifyJwt,getSpecificCandidate)
router.route('/:id').post( verifyJwt,voteCandidate)

export default router