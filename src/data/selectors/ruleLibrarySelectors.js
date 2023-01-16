export const selectSpecificRule = (state) =>
	state.rootReducer.rulesSlice.specificRule;

export const selectSpecificRuleStatus = (state) =>
	state.rootReducer.rulesSlice.specificRuleStatus;

export const getCountries = (state) => state.rootReducer.rulesSlice.countries;
