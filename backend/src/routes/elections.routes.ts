
import { Router } from 'express';
import { 
    createElection,
    getElection,
    addVoters,
    toggleResultsVisibility,
    getElectionResults,
    getElectionCandidates,
    voteCandidate,
    addCandidateToElection,
    deleteCandidate,
    checkEligibility,
    checkVoteStatus,
    submitVote
} from '../controllers/elections.controller';
import { verifyJwt, isAdmin } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';

const router = Router();

router.post('/', createElection);
router.get('/:electionId', getElection);
router.post('/check-eligibility', checkEligibility);
router.get('/check-vote-status/:userId/:electionId', checkVoteStatus);
router.post('/vote', submitVote);
router.patch('/:electionId/voters', addVoters);
router.patch('/:electionId/toggle-results', verifyJwt, isAdmin, toggleResultsVisibility);
router.get('/:electionId/results', getElectionResults);
router.get('/:electionId/candidates', verifyJwt, getElectionCandidates);
router.post('/:electionId/candidates', verifyJwt, isAdmin, upload.single('avatar'), addCandidateToElection);
router.post('/:electionId/vote/:candidateId', verifyJwt, voteCandidate);


export default router;