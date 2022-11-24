export const selectAllNews = (state) =>
	state.rootReducer.questionsLibrary.questions;

export const selectSpecificQuestion = (state) =>
	state.rootReducer.questionsLibrary.questionEdit;

export const selectSpecificQuestionStatus = (state) =>
	state.rootReducer.questionsLibrary.questionEditStatus;

export const selectSummaryFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.summaryComponentOnQuestions;
