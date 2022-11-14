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

export const bannerTypeOptions = [
	{ value: 'Title only', label: 'Title only' },
	{ value: 'Title + Text', label: 'Title + Text' }
];
//not being used right now because api is already filtering the selected banner content
export const filterBannerContent = (bannerContent, bannerData) => {
	if (bannerContent?.length === 0) return [];
	return bannerContent?.filter((item) => {
		if (item.id) {
			return !bannerData.some((subItem) => item.id === subItem?.content?.id);
		}
		return item;
	});
};

export const filterSelectedContentIds = (bannerData, previousContentValue) => {
	const selectedItemsIds = bannerData.map((item) => item?.content?.id);

	const filteredIds = selectedItemsIds.filter(
		(item) => item && previousContentValue?.id !== item
	);

	return filteredIds;
};

export const validateTopBanners = ({ bannerData }) => {
	const errors = {};

	if (!bannerData[0]?.banner_type && !bannerData[0]?.content?.title) {
		if (!errors.bannerData) errors.bannerData = [];
		errors.bannerData[0] = 'First banner cannot be empty';
	} else if (
		(!bannerData[0].banner_type && bannerData[0].content?.title) ||
		(bannerData[0].banner_type && !bannerData[0].content?.title)
	) {
		if (!errors.bannerData) errors.bannerData = [];
		errors.bannerData[0] = 'Both fields should be filled';
	}

	//for ahead of first banner
	for (let i = bannerData.length - 1; i >= 1; i--) {
		if (bannerData[i]?.banner_type && bannerData[i]?.content?.title) {
			if (
				i - 1 !== 0 &&
				(!bannerData[i - 1].banner_type || !bannerData[i - 1].content?.title)
			) {
				if (!errors.bannerData) errors.bannerData = [];
				errors.bannerData[i - 1] = 'This banner cannot be empty';
			}
		}
		if (
			(!bannerData[i].banner_type && bannerData[i].content?.title) ||
			(bannerData[i].banner_type && !bannerData[i].content?.title)
		) {
			if (!errors.bannerData) errors.bannerData = [];
			errors.bannerData[i] = 'Both fields should be filled';
		}
	}

	return errors;
};
