// import { Form, Formik } from 'formik';
import React from 'react';
import BannerForm from './components/forms/BannerForm';
// import BannerRow from './components/forms/BannerForm/subComponents/BannerRow';
import Layout from './components/layouts/DashboardLayout';
// import DraggableLayoutWrapper from './components/layouts/DraggableLayoutWrapper';

function Test() {
	return (
		<Layout title='Test'>
			<div style={{ width: '90%', margin: '0 auto' }}>
				<BannerForm />
			</div>
		</Layout>
	);
}

export default Test;
