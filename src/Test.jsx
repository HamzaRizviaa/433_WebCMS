/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik';
import React from 'react';
import FormikSelect from './components/ui/inputs/formik/FormikSelect';
import FormikField from './components/ui/inputs/formik/FormikField';
import FormikDropzone from './components/ui/inputs/formik/FormikDropzone';
import FormikSwitchField from './components/ui/inputs/formik/FormikSwitchField';
import Button from './components/ui/Button';
import Layout from './components/layouts/DashboardLayout';
import FormikLabelsSelect from './components/ui/inputs/formik/FormikLabelsSelect';
import CheckBox from './components/ui/inputs/CheckBox';
import SettingsLayout from './components/layouts/SettingsLayout';
import AdvancedSettingsForm from './components/forms/common/AdvancedSettingsForm';

const countryOptions = [
	{ value: 'pakistan', label: 'Pakistan' },
	{ value: 'bangladesh', label: 'Bangladesh' },
	{ value: 'singapore', label: 'Singapore' }
];

function Test() {
	return (
		<Layout title='Test'>
			<div style={{ width: '50%', margin: '0 auto' }}>
				<Formik
					initialValues={{
						country: '',
						city: '',
						docs: [],
						labels: [],
						show_likes: false,
						states: { value: '', label: '' }
					}}
					onSubmit={(data) => {
						console.log(data);
					}}
				>
					<Form>
						<AdvancedSettingsForm />
						{/* <FormikSelect
							name='country'
							label='Country'
							options={countryOptions}
							placeholder='Select Country'
							required
						/>
						<FormikField name='city' label='City' maxLength={10} />
						<FormikDropzone
							name='docs'
							label='Docs'
							accept='video/mp4'
							formatMessage='Accepted files are mp4'
							requiredDimension='1200x720'
							maxFiles={3}
							showPreview
							required
						/>
						<div style={{ marginTop: 10 }}>
							<FormikLabelsSelect label='LABELS' name='labels' required />
						</div>

						<div style={{ marginTop: 10 }}>
							<FormikSelect
								searchable
								label='STATES'
								name='states'
								options={countryOptions}
								required
							/>
						</div>

						<div style={{ marginTop: 10 }}>
							<FormikSwitchField label='Show Likes' name='show_likes' />
						</div> */}
						<Button type='submit' buttonText='Submit' style={{ marginTop: 10 }}>
							Submit
						</Button>
					</Form>
				</Formik>
			</div>
		</Layout>
	);
}

export default Test;
