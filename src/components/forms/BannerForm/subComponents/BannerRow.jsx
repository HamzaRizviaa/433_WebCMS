import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import DraggableBannerLayout from '../../../layouts/DraggableBannerLayout';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import { useBannerFormStyles } from '../index.style';
import {
	selectBannerContent,
	selectBannerContentStatus
} from '../../../../data/selectors';
import { getBannerContent } from '../../../../data/features/topBanner/topBannerActions';
import {
	filterBannerContent,
	bannerTypeOptions
} from '../../../../data/helpers/topBannerHelpers';

const BannerRow = ({ item, index, errorMsg, tabValue }) => {
	const classes = useBannerFormStyles();

	const dispatch = useDispatch();

	const { setFieldValue, values } = useFormikContext();

	const bannerContent = useSelector(selectBannerContent);
	const bannerContentState = useSelector(selectBannerContentStatus);

	const filteredBannerContent = useMemo(() => {
		return filterBannerContent(bannerContent, values.bannerData);
	}, [bannerContent, values.bannerData]);

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
		dispatch(
			getBannerContent({
				type: tabValue,
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
					<label className={classes.bannerLabel}>Select Content</label>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							searchable
							isLoading={bannerContentState}
							onSearchTextChange={handleSearchText}
							name={`bannerData.${index}.content`}
							options={filteredBannerContent}
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
