/* eslint-disable react/prop-types */
import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import DraggableBannerLayout from '../../../layouts/DraggableBannerLayout';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import { useBannerFormStyles } from '../index.style';
import { selectBannerContent } from '../../../../data/selectors';
import { getBannerContent } from '../../../../data/features/topBanner/topBannerActions';

const bannerTypeOptions = [
	{ value: 'Title only', label: 'Title only' },
	{ value: 'Title + Text', label: 'Title + Text' }
];

const BannerRow = ({ item, index, errorMsg }) => {
	const classes = useBannerFormStyles();

	const dispatch = useDispatch();

	const { setFieldValue } = useFormikContext();

	const bannerContent = useSelector(selectBannerContent);

	const handleDelete = () => {
		console.log('abc delete');
		setFieldValue(`bannerData.${index}.banner_type`, '');
		setFieldValue(`bannerData.${index}.content`, {
			id: '',
			title: '',
			type: ''
		});
		setFieldValue(`bannerData.${index}.id`, '');
	};

	console.log();
	const handleSearchText = (value) => {
		dispatch(
			getBannerContent({
				type: 'home',
				title: value
			})
		);
	};

	return (
		<div className={classes.bannerAndTitle}>
			<div className={classes.bannertext} key={index}>
				Banner {index + 1}
			</div>
			<DraggableBannerLayout
				item={item}
				index={index}
				errorMsg={errorMsg}
				onDeleteIconClick={handleDelete}
			>
				<div className={classes.contentTypeWrapper}>
					<label className={classes.bannerLabel}>Select Banner Type</label>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							name={`bannerData.${index}.banner_type`}
							options={bannerTypeOptions}
						/>
					</div>
				</div>

				<div className={classes.contentTypeWrapper}>
					<label className={classes.bannerLabel}>Select Banner Type</label>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							onSearchTextChange={handleSearchText}
							searchable
							name={`bannerData.${index}.content`}
							options={bannerContent}
							mapOptions={{ valueKey: 'id', labelKey: 'title' }}
						/>
					</div>
				</div>
			</DraggableBannerLayout>
		</div>
	);
};

export default BannerRow;
