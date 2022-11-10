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
	bannersValidations
} from '../../../data/helpers';
import { useBannerFormStyles } from './index.style';

const BannerForm = ({ tabValue }) => {
	const dispatch = useDispatch();
	const classes = useBannerFormStyles();

	const allBanners = useSelector(selectAllBanners);

	const initialValues = useMemo(() => {
		return isEmpty(allBanners)
			? topBannerInitialValues
			: bannerDataFormatterForForm(allBanners);
	}, [allBanners]);

	const handleSubmit = async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			const data = bannerDataFormatterForService(values, tabValue);

			await dispatch(createOrEditTopBanner(data));
		} catch (error) {
			console.error(error);
		} finally {
			formikBag.setSubmitting(false);
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
			validationSchema={bannersValidations}
			validateOnMount
		>
			<Form>
				<FieldArray
					name='bannerData'
					render={(props) => <BannerFormRows {...props} />}
				/>
				<Button fullWidth type='submit' className={classes.publishButton}>
					PUBLISH {tabValue} BANNERS
				</Button>
			</Form>
		</Formik>
	);
};

BannerForm.propTypes = {
	tabValue: PropTypes.string.isRequired
};

export default BannerForm;
