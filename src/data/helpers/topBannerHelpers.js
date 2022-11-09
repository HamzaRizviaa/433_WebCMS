export const topBannerInitialValues = {
	bannerData: [
		{
			id: '1',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			id: '2',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			id: '3',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			id: '4',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			id: '5',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		}
	]
};

// structuring the data on getAllBanners api
export const bannerDataFormatterForForm = (allBanners) => {
	const allBannersLength = allBanners.length;
	const slicedBannerData = topBannerInitialValues.bannerData.slice(
		allBannersLength,
		5
	);

	return { bannerData: [...allBanners, ...slicedBannerData] };
};

const idsArray = ['1', '2', '3', '4', '5'];

// structuring the payload data for post api call
export const bannerDataFormatterForService = (bannerValues, type = 'home') => {
	const bannerDataForService = {
		banners: bannerValues.bannerData.map((item, index) => ({
			banner_id: idsArray.includes(item.id) ? null : item.id || null,
			content: item.content.title ? item.content : null,
			banner_type: item.banner_type,
			sort_order: index + 1
		})),
		type
	};

	return bannerDataForService;
};
