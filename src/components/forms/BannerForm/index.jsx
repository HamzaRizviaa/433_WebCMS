import React, { useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { FieldArray, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

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
	bannerDataFormatterForService
} from '../../../data/helpers';

const BannerForm = () => {
	const dispatch = useDispatch();

	const allBanners = useSelector(selectAllBanners);

	const initialValues = useMemo(() => {
		return isEmpty(allBanners)
			? topBannerInitialValues
			: bannerDataFormatterForForm(allBanners);
	}, [allBanners]);

	const handleSubmit = async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			const data = bannerDataFormatterForService(values);

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
				type: 'home',
				title: null
			})
		);
		dispatch(getAllBanners('home'));
	}, []);

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			onSubmit={handleSubmit}
		>
			<Form>
				<FieldArray
					name='bannerData'
					render={(props) => <BannerFormRows {...props} />}
				/>
				<Button fullWidth type='submit'>
					PUBLISH HOME BANNERS
				</Button>
			</Form>
		</Formik>
	);
};

BannerForm.propTypes = {};

export default BannerForm;
