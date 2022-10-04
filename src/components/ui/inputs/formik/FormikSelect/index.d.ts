import { SelectFieldProps, SelectOption } from '../../SelectField';

type FormikSelectProps<T extends SelectOption> = Omit<
	SelectFieldProps<T>,
	'onChange' | 'onBlur'
> & {
	onChange?: (field: string, value: any) => void;
	onBlur?: (field: string, value: any) => void;
};

/**
 *
 * The `FormikSelect` is a wrapper over `SelectField` component and should be use under the context of `Formik`.
 * You can pass every prop which is a valid `SelectField` prop. There are only two required prop and that is `name`
 * and `options`. You don't required to pass `change handler` in order to set value of field. This component will
 * handle it under the hood. In addition, if you want to manipulate value of select field before setting it then you
 * can pass `onChange` handler but its API is different from native select field as it is made to fulfill `Formik` needs.
 *
 * ### Change and Blur handler API:
 *```
 * onChange: (field: string, value: any) => void;
 * onBlur: (field: string, value: any) => void;
 * ```
 *
 * ### Usage Example:
 * Following is the minimal example to demonstrate how you can use this component.
 * @example
 * <Formik
 * 	initialValues={{ country: '', city: '' }}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	{({ setFieldValue }) => (
 * 		<Form>
 * 			<FormikSelect
 * 				name='country'
 * 				label='Country'
 * 				options={countryOptions}
 * 			/>
 * 			<FormikSelect
 * 				searchable
 * 				name='city'
 * 				label='City'
 * 				options={cityOptions}
 * 			/>
 * 			<button type='submit'>Submit</button>
 * 		</Form>
 * 	)}
 * </Formik>
 */
export default function FormikSelect<T extends SelectOption>(
	props: FormikSelectProps<T>
): JSX.Element;
