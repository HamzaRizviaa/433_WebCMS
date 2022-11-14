import React, { useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { FieldArray, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import BannerFormRows from './subComponents/BannerFormRows';
import {
	getBannerContent,
	getAllBanners,
	createOrEditTopBanner
} from '../../../data/features/topBanner/topBannerSlice';
import Button from '../../ui/Button';
import { selectAllBanners } from '../../../data/selectors';
import {
	topBannerInitialValues,
	bannerDataFormatterForForm,
	bannerDataFormatterForService,
	validateTopBanners
} from '../../../data/helpers';
import { useBannerFormStyles } from './index.style';

const BannerForm = ({ tabValue, setFormSubmitting }) => {
	const dispatch = useDispatch();
	const classes = useBannerFormStyles();

	const allBanners = useSelector(selectAllBanners);

	const initialValues = useMemo(() => {
		return isEmpty(allBanners)
			? topBannerInitialValues
			: bannerDataFormatterForForm(allBanners);
	}, [allBanners]);

	const handleSubmit = async (values) => {
		setFormSubmitting(true);

		try {
			const data = bannerDataFormatterForService(values, tabValue);

			await dispatch(createOrEditTopBanner(data));
			await dispatch(getAllBanners(tabValue));
			await dispatch(
				getBannerContent({
					type: tabValue,
					title: null
				})
			);
			setFormSubmitting(false);
		} catch (error) {
			console.error(error);
		} finally {
			setFormSubmitting(false);
		}
	};

	useEffect(() => {
		dispatch(
			getBannerContent({
				type: tabValue,
				title: null
			})
		);
		dispatch(getAllBanners(tabValue));
	}, []);

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={validateTopBanners}
		>
			{({ dirty, isValid }) => (
				<Form>
					<div className={classes.bannerMain}>
						<FieldArray
							name='bannerData'
							render={(props) => (
								<BannerFormRows {...props} tabValue={tabValue} />
							)}
						/>

						<Button
							fullWidth
							type='submit'
							className={classes.publishButton}
							disabled={!dirty ? isValid : !isValid}
						>
							PUBLISH {tabValue} BANNERS
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

BannerForm.propTypes = {
	tabValue: PropTypes.string.isRequired,
	setFormSubmitting: PropTypes.func.isRequired
};

export default BannerForm;
