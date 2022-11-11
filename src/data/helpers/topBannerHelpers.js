import * as Yup from 'yup';

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

console.log(topBannerInitialValues, 'topBannerInitialValues');
// banners validations

// const bannerDataItem = Yup.object({
// 	id: Yup.string(),
// 	//banner_type: Yup.string().oneOf(['home', 'media']).required(),
// 	banner_type: Yup.string(),
// 	//.required('Banner Type can not be empty'),
// 	content: Yup.mixed().transform((v) => (!v.title ? undefined : v))
// 	//.required('Content Type can not be empty')
// })

export const bannersValidations = Yup.object({
	bannerData: Yup.array()
		.of(
			Yup.object({
				id: Yup.string(),
				//banner_type: Yup.string().oneOf(['home', 'media']).required(),
				banner_type: Yup.string(),
				//.required('Banner Type can not be empty'),
				content: Yup.mixed().transform((v) => (!v.title ? undefined : v))
				//.required('Content Type can not be empty')
			})
		)
		.min(1)
		.required('At least 1 banner is require for submitting')
		.test(
			'invalidOrder',
			'The order of the banner items is not valid',
			(value) => {
				let errFlag = true;

				//2-5
				for (let i = value.length - 1; i >= 1; i--) {
					if (value[i]?.banner_type && value[i]?.content?.title) {
						if (!value[i - 1].banner_type || !value[i - 1].content?.title)
							errFlag = false;
						break;
					} else if (value[i].banner_type || value[i]?.content?.title) {
						errFlag = false;
						break;
					}
				}

				return errFlag;
				// return (
				// 	errFlag ||
				// 	this.createError({
				// 		banner: 'The order of the banner items is not valid',
				// 		banner2: 'Error 2'
				// 	})
				// );
			}
		)
		.test('invalidOrder', 'First banner can not be empty', (value) => {
			let errFlag2 = true;

			if (!value[0]?.banner_type ^ !value[0]?.content?.title) {
				errFlag2 = false;
			} else if (!value[0]?.banner_type || !value[0]?.content?.title) {
				errFlag2 = false;
			}

			return errFlag2;
		})
});

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
