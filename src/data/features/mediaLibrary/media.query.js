import rootRtkQuery from '../rootRTKQuery';

export const mediaQueries = rootRtkQuery.injectEndpoints({
	endpoints: (build) => ({
		getMainCategories: build.query({
			query: () => ({
				url: `/media/get-main-categories`
			}),
			transformResponse: (response) => response.data
		}),
		getSubCategories: build.query({
			query: (subId) => ({
				url: `/media/get-sub-categories/${subId}`
			}),
			transformResponse: (response) => response.data
		})
	}),
	overrideExisting: false
});

export const { useGetMainCategoriesQuery, useLazyGetSubCategoriesQuery } =
	mediaQueries;
