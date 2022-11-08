import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { FieldArray, Form, Formik } from 'formik';
import BannerFormRows from './subComponents/BannerFormRows';
import { useDispatch, useSelector } from 'react-redux';
import {
	getBannerContent,
	getAllBanners
} from '../../../data/features/topBanner/topBannerSlice';
import Button from '../../ui/Button';
import { selectAllBanners } from '../../../data/selectors';

const initialValues = {
	bannerData: [
		{
			banner_id: '1',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			banner_id: '2',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			banner_id: '3',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			banner_id: '4',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		},
		{
			banner_id: '5',
			banner_type: '',
			content: { id: '', title: '', type: '' },
			sort_order: 0
		}
	]
};

const BannerForm = () => {
	const dispatch = useDispatch();

	// eslint-disable-next-line no-unused-vars
	const allBanners = useSelector(selectAllBanners);

	useEffect(() => {
		dispatch(
			getBannerContent({
				type: 'home',
				title: null
			})
		);
		dispatch(getAllBanners());
	}, []);

	return (
		<Formik initialValues={initialValues}>
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
