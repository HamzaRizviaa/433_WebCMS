/* eslint-disable react/prop-types */
import React from 'react';
import DraggableBannerLayout from '../../../layouts/DraggableBannerLayout';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import { useBannerFormStyles } from '../index.style';
import { useSelector, useDispatch } from 'react-redux';
import { selectBannerContent } from '../../../../data/selectors';
import { getBannerContent } from '../../../../data/features/topBanner/topBannerActions';

const bannerTypeOptions = [
	{ value: '0', label: 'Title only' },
	{ value: '1', label: 'Title + Text' }
];

const BannerRow = ({ item, index, errorMsg, onDeleteIconClick }) => {
	const classes = useBannerFormStyles();

	const dispatch = useDispatch();

	const bannerContent = useSelector(selectBannerContent);

	const handleSearchText = (value) => {
		dispatch(
			getBannerContent({
				type: 'home',
				title: value
			})
		);
	};

	return (
		<DraggableBannerLayout
			item={item}
			index={index}
			errorMsg={errorMsg}
			onDeleteIconClick={onDeleteIconClick}
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
	);
};

export default BannerRow;
