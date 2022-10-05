import rootRTKQuery from '../rootRTKQuery';

const translationQueries = rootRTKQuery.injectEndpoints({
	endpoints: (build) => ({
		getTranslation: build.query({
			query: (data) => ({
				url: `/translations/translate`,
				method: 'POST',
				body: data,
				keepUnusedDataFor: 0 //60 * 60 * 10
			}),
			transformResponse: (response) => response.data
		})
	}),
	overrideExisting: false
});

export const { useLazyGetTranslationQuery } = translationQueries;
