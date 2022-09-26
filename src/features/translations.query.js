import rootRtkQuery from './rootRTKQuery';

const translationsQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getTranslation: build.query({
			query: (data) => ({
				url: `/translations/translate`,
				method: 'POST',
				body: data,
				keepUnusedDataFor: 60 * 60 * 10
			}),
			transformResponse: (response) => response.data
		})
	}),
	overrideExisting: false
});

export const { useLazyGetTranslationQuery } = translationsQuery;
