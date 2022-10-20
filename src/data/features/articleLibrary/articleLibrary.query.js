import rootRtkQuery from '../../../data/features/rootRTKQuery';

const articlesQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getMatchesTree: build.query({
			query: () => 'https://predev.cms.api.by433.com/api/v1/matches',
			transformResponse: (response) => response.data
		})
	})
});

export const { useLazyGetMatchesTreeQuery } = articlesQuery;
