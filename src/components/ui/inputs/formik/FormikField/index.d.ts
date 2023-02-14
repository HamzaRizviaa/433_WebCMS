import { InputFieldProps } from '../../InputField';

type FormikFieldProps = Omit<InputFieldProps, 'onChange'> & {
	onChange: (value?: string | number) => void;
};

/**
 *
 * The `FormikField` is a wrapper over `InputField` component and should be use under the context of `Formik`.
 * You can pass every prop which is a valid `InputField` prop. There is only one required prop and that is `name`.
 * You don't required to pass `change handler` in order to set value of field. This component will handle it under
 * the hood. In addition, if you want to manipulate value of input field before setting it then you can pass `onChange`
 * handler.
 *
 * ### Usage Example:
 * Following is the minimal example to demonstrate how you can use this component.
 * @example
 * <Formik
 * 	initialValues={{ name: '', email: '' }}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	{({ setFieldValue }) => (
 * 		<Form>
 * 			<FormikField
 * 				name='name'
 * 				label='Name'
 * 			/>
 * 			<FormikField
 * 				name='email'
 * 				label='Email'
 * 				onChange={(field, value) => {
 * 					setFieldValue(field, value.toLowerCase());
 * 				}}
 * 			/>
 * 			<button type='submit'>Submit</button>
 * 		</Form>
 * 	)}
 * </Formik>
 */
export default function FormikField(props: FormikFieldProps): JSX.Element;
