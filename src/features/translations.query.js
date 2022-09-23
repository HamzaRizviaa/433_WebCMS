import rootRtkQuery from './rootRTKQuery';

const translationsQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getTranslations: build.mutation({
			query: (data) => ({
				url: `/translations/translate`,
				method: 'POST',
				body: data
			}),
			transformResponse: (response) => response.data
		})
	}),
	overrideExisting: false
});

export const { useGetTranslationsMutation } = translationsQuery;
