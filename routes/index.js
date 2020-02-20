

const express = require('express');
const router = express.Router();

const subjectRoutes = require('./../api/subject');
const themeRoutes = require('./../api/theme');
const topicRoutes = require('./../api/topic');
const contentRoutes = require('./../api/content');
const objectiveRoutes = require('./../api/objective');
const instructionRoutes = require('./../api/instruction');
const questionRoutes = require('./../api/question');
const answerRoutes = require('./../api/answer');
const distractorRoutes = require('./../api/distractor');
const testRoutes = require('./../api/test');
const scoreRoutes = require('./../api/score');
const resourceRoutes = require('./../api/resource');
const mockRoutes = require('./../api/mock');
const mockscoreRoutes = require('./../api/mockscore');
const userRoutes = require('./../api/user');
const API = '';

router.use(`${API}/subject`, subjectRoutes);
router.use(`${API}/theme`, themeRoutes);
router.use(`${API}/topic`, topicRoutes);
router.use(`${API}/content`, contentRoutes);
router.use(`${API}/objective`, objectiveRoutes);
router.use(`${API}/instruction`, instructionRoutes);
router.use(`${API}/question`, questionRoutes);
router.use(`${API}/answer`, answerRoutes);
router.use(`${API}/distractor`, distractorRoutes);
router.use(`${API}/test`, testRoutes);
router.use(`${API}/score`, scoreRoutes);
router.use(`${API}/mock`, mockRoutes);
router.use(`${API}/mockscore`, mockscoreRoutes);
router.use(`${API}/resource`, resourceRoutes);
router.use(`${API}/user`, userRoutes);

module.exports = router;
