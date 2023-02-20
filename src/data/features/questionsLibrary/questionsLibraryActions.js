import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionsLibraryService } from '../../services';
import { ToastErrorNotifications } from '../../../data/constants';

export const getQuestions = createAsyncThunk(
	'questionLibrary/getQuestions',
	async (params = {}) => {
		const { data: questions } =
			await QuestionsLibraryService.getAllQuestionsApi(params);

		return questions.data;
	}
);

export const getQuestionEdit = createAsyncThunk(
	'questionLibrary/getQuestionEdit',
	async ({ id, type }) => {
		const params = {
			question_meta_id: id,
			question_type: type
		};
		const response = await QuestionsLibraryService.getQuestionEditApi(params);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getQuestionLabels = createAsyncThunk(
	'questionLibrary/getQuestionLabels',
	async () => {
		const result = await QuestionsLibraryService.getQuizLabelsApi();

		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const createOrEditQuestionThunk = createAsyncThunk(
	'questionLibrary/createOrEditQuestionThunk',
	async ({ apiVersion, shouldTransition, ...data }) => {
		try {
			const response = await QuestionsLibraryService.postQuestion(
				data,
				apiVersion,
				shouldTransition
			);

			if (response.data.status_code === 200) {
				toast.success(
					data.question_id
						? 'Question has been edited!'
						: 'Question has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.question_id
					? 'Failed to edit question!'
					: 'Failed to create question!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteQuestionThunk = createAsyncThunk(
	'questionLibrary/deleteQuestionThunk',
	async (data) => {
		try {
			const response = await QuestionsLibraryService.deleteQuestion(data);

			if (response.data.status_code === 200) {
				response.data?.data?.is_deleted === false
					? toast.error(ToastErrorNotifications.deleteBannerItemText)
					: toast.success('Question has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Question!');
			console.error(e);
		}
	}
);

export const stopQuestionThunk = createAsyncThunk(
	'questionLibrary/stopQuestionThunk',
	async (data) => {
		try {
			const response = await QuestionsLibraryService.stopQuestion(data);

			if (response?.data.status_code === 200) {
				response.data?.data?.is_deleted === false
					? toast.error(ToastErrorNotifications.stopQuestionBannerItemText)
					: toast.success('Question has been Stopped!');
			}
		} catch (e) {
			toast.error('Failed to stop Question!');
			console.error(e);
		}
	}
);
