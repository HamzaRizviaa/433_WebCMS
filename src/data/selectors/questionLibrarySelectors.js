export const selectAllQuestions = (state) =>
	state.rootReducer.questionsLibrary.questions;

export const selectSpecificQuestion = (state) =>
	state.rootReducer.questionsLibrary.questionEdit;

export const selectSpecificQuestionStatus = (state) =>
	state.rootReducer.questionsLibrary.questionEditStatus;

export const selectSummaryFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.summaryComponentOnQuestions;

export const selectTriviaFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.triviaOnQuestions;

export const selectReadMoreArticlesFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.readMoreAPI;
