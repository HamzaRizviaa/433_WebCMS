import rootRtkQuery from '../../../data/features/rootRTKQuery';

const articlesQuery = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getMatchesTree: build.query({
			query: () => '/matches',
			transformResponse: (response) => response.data
		}),
		getPost: build.query({
			query: (url) => ({
				url
				// responseHandler: (res) => res.text()
			}),
			transformResponse: (res) => res.data
		})
	})
});

export const { useLazyGetMatchesTreeQuery, useLazyGetPostQuery } =
	articlesQuery;
