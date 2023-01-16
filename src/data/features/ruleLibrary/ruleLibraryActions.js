/**
 * @module features/ruleLibraryActions
 * @description The ruleLibraryActions module contains all the asynchronous action handlers related to rules slice
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RuleService, RuleLibraryService } from '../../services';

export const fetchRules = createAsyncThunk('rule/fetchRules', async () => {
	const result = await RuleService.getRules();
	if (result) {
		return result.data.data;
	} else {
		return [];
	}
});

/**
 * This action handler is responsible for the fetching of all rules.
 * See {@link RuleService} if you are interested in the getAllRulesssServiceCall function
 * which is used inside this action handler.
 * @type {Function}
 * @param {*} params - Query params on which the records should be filtered out
 * @returns The data object from the API response
 */
export const getAllRulesApi = createAsyncThunk(
	'ruleLibrary/getAllRulesApi',
	async (params = {}) => {
		const { data: rules } = await RuleLibraryService.getAllRulesServiceCall(
			params
		);
		return rules.data;
	}
);

/**
 * This action handler is responsible for the fetching of a single rule by id.
 * See {@link RuleService} if you are interested in the getSpecificRule function
 * which is used inside this action handler.
 * @type {Function}
 * @param {string} id - The id of the rule
 * @returns The data object from the API response
 */
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

/**
 * This action handler is responsible for the creation and updation of a rule.
 * See {@link RuleService} if you are interested in the createOrEditRuleThunk function
 * which is used inside this action handler.
 * @type {Function}
 * @param {Object} data - The data field contains the properties of a rule
 */
export const createOrEditRuleThunk = createAsyncThunk(
	'ruleLibrary/createOrEditRuleThunk',
	async (data) => {
		console.log(data, 'data rule post');
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

/**
 * This action handler is responsible for the deletion of a rule.
 * See {@link RuleService} if you are interested in the deleteViral function
 * which is used inside this action handler.
 * @type {Function}
 * @param {Object} data - The data field contains the rule_id and is_draft properties
 */
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
