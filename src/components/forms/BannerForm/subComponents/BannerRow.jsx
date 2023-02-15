import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DraggableBannerLayout from '../../../layouts/DraggableBannerLayout';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import { useBannerFormStyles } from '../index.style';
import {
	selectBannerContent,
	selectBannerContentStatus,
	selectBannerContentFeatureFlag
} from '../../../../data/selectors';
import { getBannerContent } from '../../../../data/features/topBanner/topBannerActions';
import {
	bannerTypeOptions,
	filterSelectedContentIds
} from '../../../../data/helpers/topBannerHelpers';

const BannerRow = ({ item, index, errorMsg, tabValue }) => {
	const classes = useBannerFormStyles();
	const dispatch = useDispatch();

	const { setFieldValue, values } = useFormikContext();

	const bannerContent = useSelector(selectBannerContent);
	const bannerContentState = useSelector(selectBannerContentStatus);

	// if flag enabled , select content dropdown will have data from question library
	const selectBannerContentWithoutQuestions = useSelector(
		selectBannerContentFeatureFlag
	);

	const isBannerContentEnabled =
		selectBannerContentWithoutQuestions?._value === 'true';

	const bannerWithoutQuestion = bannerContent.filter(
		(e) => e.type !== 'QuestionMeta'
	);

	const handleDelete = () => {
		setFieldValue(`bannerData.${index}.banner_type`, '');
		setFieldValue(`bannerData.${index}.content`, {
			id: '',
			title: '',
			type: ''
		});
		setFieldValue(`bannerData.${index}.id`, `${index + 1}`);
	};

	const handleSearchText = (value) => {
		const filteredIds = filterSelectedContentIds(values.bannerData);
		dispatch(
			getBannerContent({
				type: tabValue,
				title: value,
				exclude: filteredIds
			})
		);
	};

	const handleClearText = () => {
		const previousContentValue = values.bannerData[index].content;
		setFieldValue(`bannerData.${index}.content`, {
			id: '',
			title: '',
			type: ''
		});
		const filteredIds = filterSelectedContentIds(
			values.bannerData,
			previousContentValue
		);

		if (previousContentValue.id) {
			dispatch(
				getBannerContent({
					type: tabValue,
					title: null,
					exclude: filteredIds
				})
			);
		}
	};

	const handleChange = (value) => {
		const filteredIds = filterSelectedContentIds(values.bannerData);

		dispatch(
			getBannerContent({
				type: tabValue,
				title: null,
				exclude: [...filteredIds, value.id]
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
							placeholder='Select Banner Type'
							name={`bannerData.${index}.banner_type`}
							options={bannerTypeOptions}
						/>
					</div>
				</div>
				<div className={classes.contentTypeWrapper}>
					<label className={classes.bannerLabel}>Select Content</label>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							placeholder='Select Content'
							onClearText={handleClearText}
							searchable
							isLoading={bannerContentState}
							onSearchTextChange={handleSearchText}
							onChange={handleChange}
							name={`bannerData.${index}.content`}
							options={
								isBannerContentEnabled ? bannerContent : bannerWithoutQuestion
							}
							mapOptions={{ valueKey: 'id', labelKey: 'title' }}
						/>
					</div>
				</div>
			</DraggableBannerLayout>
		</div>
	);
};

BannerRow.propTypes = {
	item: PropTypes.object.isRequired,
	index: PropTypes.string.isRequired,
	errorMsg: PropTypes.oneOf([PropTypes.array, PropTypes.string]),
	tabValue: PropTypes.string.isRequired
};

export default BannerRow;
