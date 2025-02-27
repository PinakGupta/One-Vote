
// this is just to understand how can i get the data from a specific collection. So for that we will create a route to access the data and doing it more clearly we use a controller for admin 

import { Router } from 'express'
import { getAdminDetails } from "../controllers/getAdminData.controller"
import { getStateDistrictsData } from "../controllers/getStateDistrict.controller"
import { getCandidate, getSpecificCandidate } from '../controllers/candidates.controller'
import { verifyJwt } from '../middlewares/auth.middleware'
import { voteCandidate } from '../controllers/users.controller'
import { getCandidateVoteCount,toggleResultsVisibility,getResultsVisibility  } from '../controllers/getCandidateVoteCount.controller'
const router = Router()

// GET admin Data
router.route('/admin-data').get(getAdminDetails)
router.route('/:id/view-count').get(verifyJwt,getCandidateVoteCount);

router.route('/:id/toggle-results').patch(verifyJwt,toggleResultsVisibility);
router.route('/:id/results-visibility').get(getResultsVisibility);



// GET District State List
router.route('/district-state').get(getStateDistrictsData)
// GET Candidates List
router.route('/').get(verifyJwt,getCandidate)
// GET a specific Candidate
router.route('/:id').get( verifyJwt,getSpecificCandidate)
router.route('/:id').post( verifyJwt,voteCandidate)

export default router