const API = '';
const SUBJECTS = 'subjects';
const THEMES = ['themes', 'subjectID'];
const TOPICS = ['topics', 'themeID'];
const CONTENTS = ['contents', 'topicID'];
const OBJECTIVES= ['objectives', 'topicID'];
const INSTRUCTIONS = ['instructions', 'topicID'];
const RESOURCES = ['resources', 'topicID'];
const QUESTIONS = ['questions', 'instructionID'];
const ANSWERS = ['answers', 'questionID'];
const DISTRACTORS = ['distractors', 'questionID'];
const TESTS = ['tests', 'userID'];
const SCORES = ['scores', 'userID'];
const MOCKS = ['mocks', 'topicID'];
const MOCKSCORES = ['mockscores', 'topicID'];
const CLIENTS = 'clients';
const USERS = 'users';

module.exports = {
    API ,
    SUBJECTS,
    THEMES,
    TOPICS,
    CONTENTS,
    OBJECTIVES,
    INSTRUCTIONS,
    QUESTIONS,
    INSTRUCTIONS,
    QUESTIONS,
    ANSWERS,
    DISTRACTORS,
    CLIENTS,
    USERS,
    SCORES,
    TESTS,
    MOCKS,
    MOCKSCORES,
    RESOURCES

}