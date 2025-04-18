import { Router } from 'express';
import { 
    createElection,
    getElection,
    addVoters,
    toggleResultsVisibility,
    getElectionResults,
    getElectionCandidates,
    voteCandidate,
    addCandidateToElection
} from '../controllers/elections.controller';
import { verifyJwt, isAdmin } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';

const router = Router();

router.post('/', createElection);
router.get('/:electionId', verifyJwt, getElection);
router.patch('/:electionId/voters', verifyJwt, isAdmin, addVoters);
router.patch('/:electionId/toggle-results', verifyJwt, isAdmin, toggleResultsVisibility);
router.get('/:electionId/results', getElectionResults);
router.get('/:electionId/candidates', verifyJwt, getElectionCandidates);
router.post('/:electionId/candidates', verifyJwt, isAdmin, upload.single('avatar'), addCandidateToElection);
router.post('/:electionId/vote/:candidateId', verifyJwt, voteCandidate);

export default router;