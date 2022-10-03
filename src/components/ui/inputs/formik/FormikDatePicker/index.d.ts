import { DatePickerFieldProps } from '../../DatePickerField';

export interface FormikDatePickerProps
	extends Omit<DatePickerFieldProps, 'onChange' | 'onBlur'> {
	onChange: (field: string, value?: string | number) => void;
	onBlur: (field: string, value?: string | number) => void;
}

/**
 *
 * The `FormikDatePicker` is a wrapper over `DatePickerField` component and should be use under the context of `Formik`.
 * You can pass every prop which is a valid `DatePickerField` prop. There is only one required prop and that is `name`.
 * You don't need to pass `change handler` in order to set value of field. This component will handle it under
 * the hood. In addition, if you want to manipulate value of datepicker field before setting it then you can pass
 * `onChange` handler but its API is different from `DatePickerField` as it is made to fulfill `Formik` needs.
 *
 * ### Change and Blur handler API:
 *```
 * onChange: (field: string, value?: string | number) => void;
 * onBlur: (field: string, value?: string | number) => void;
 * ```
 *
 * ### Usage Example:
 * Following is the minimal example to demonstrate how you can use this component.
 * @example
 *
 * <Formik
 * 	initialValues={{ eventName: '', eventDate: null }}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	<Form>
 * 		<FormikField name='eventName' label='Event Name' />
 * 		<FormikDatePicker
 * 			name='eventDate'
 * 			label='Event Date'
 * 			placeholder='Select Event Date'
 * 			isClearable
 * 		/>
 * 		<button type='submit'>Submit</button>
 * 	</Form>
 * </Formik>
 */
export default function FormikDatePicker(
	props: FormikDatePickerProps
): JSX.Element;
