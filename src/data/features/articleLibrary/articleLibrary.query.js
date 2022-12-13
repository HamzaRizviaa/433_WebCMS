import rootRtkQuery from '../../../data/features/rootRTKQuery';

const articlesQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getMatchesTree: build.query({
			query: () => '/matches',
			transformResponse: (response) => response.data
		})
	})
});

export const { useLazyGetMatchesTreeQuery } = articlesQuery;
