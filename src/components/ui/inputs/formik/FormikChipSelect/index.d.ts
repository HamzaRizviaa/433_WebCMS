export interface FormikChipSelectProps {
	name: string;
	onChange: (field: string, value?: string | number) => void;
	onBlur: (field: string, value?: string | number) => void;
}

/**
 *
 * The `FormikChipSelect` is a reusable component that is used in place for the multi select autocomplete.
 * It takes restProps from the LabelSelect component that in turns passes it on to the chipSelect
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
 * 	initialValues={{ name: ''}}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	<Form>
 * 		<FormikChipSelect 
            name='label'
            title='LABELS'
            placeholder='Select a minimum of 7 labels'
            ...restProps
        />
 * 		<button type='submit'>Submit</button>
 * 	</Form>
 * </Formik>
 */
export default function FormikChipSelect(
	props: FormikChipSelectProps
): JSX.Element;
