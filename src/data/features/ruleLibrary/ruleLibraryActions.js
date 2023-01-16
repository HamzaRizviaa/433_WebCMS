import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import RuleLibraryService from '../../services/ruleLibraryService';

export const fetchRules = createAsyncThunk('rule/fetchRules', async () => {
	const result = await RuleLibraryService.getRules();
	if (result) {
		return result.data.data;
	} else {
		return [];
	}
});

export const getAllRulesApi = createAsyncThunk(
	'ruleLibrary/getAllRulesApi',
	async (params = {}) => {
		const { data: rules } = await RuleLibraryService.getAllRulesServiceCall(
			params
		);
		return rules.data;
	}
);

export const getSpecificRule = createAsyncThunk(
	'editButton/getSpecificRule', // not url , url is in services
	async (id) => {
		const response = await RuleLibraryService.getSpecificRuleApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const createOrEditRuleThunk = createAsyncThunk(
	'ruleLibrary/createOrEditRuleThunk',
	async (data) => {
		try {
			const response = await RuleLibraryService.postRule(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.rule_id ? 'Rule has been edited!' : 'Rule has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.rule_id ? 'Failed to edit rule!' : 'Failed to create rule!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteRuleThunk = createAsyncThunk(
	'ruleLibrary/deleteRuleThunk',
	async (data) => {
		try {
			const response = await RuleLibraryService.deleteViral(data);

			if (response.data.status_code === 200) {
				toast.success('Viral has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Viral!');
			console.error(e);
		}
	}
);
