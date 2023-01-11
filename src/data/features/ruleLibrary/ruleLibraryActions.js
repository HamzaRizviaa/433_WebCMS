import { createAsyncThunk } from '@reduxjs/toolkit';
import { RuleLibraryService } from '../../services';

export const fetchRules = createAsyncThunk('rule/fetchRules', async () => {
	const result = await RuleLibraryService.getRules();
	if (result) {
		return result.data.data;
	} else {
		return [];
	}
});
