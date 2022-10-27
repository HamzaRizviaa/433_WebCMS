import { DropzoneFieldProps, FileObject } from '../../DropzoneField';

export type FormikDropzoneProps = DropzoneFieldProps & {
	onChange: (field: string, value?: Array<FileObject>) => void;
};

/**
 *
 * The `FormikDropzone` is a wrapper over `DropzoneField` component and should be use under the context of `Formik`.
 * You can pass every prop which is a valid `DropzoneField` prop. There is only one required prop and that is `name`.
 * You don't need to pass `change handler` in order to set value of field. This component will handle it under
 * the hood. In addition, if you want to handle value of dropzone field on change then you can pass `onChange`
 * handler.
 *
 * ### Change handler API:
 *```
 * onChange: (field: string, value?: Array<FileObject>) => void;
 * ```
 *
 * ### Usage Example:
 * Following is the minimal example to demonstrate how you can use this component.
 * @example
 *
 * <Formik
 * 	initialValues={{ title: '', viral: [] }}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	<Form>
 * 		<FormikField name='title' label='Title' />
 * 		<FormikDropzone
 * 			name='viral'
 * 			label='Viral'
 * 			accept='image/jpeg, image/png, video/mp4'
 * 			formatMessage='Accepted files are jpg, png and mp4'
 * 			requiredDimension='1200x720'
 * 			maxFiles={3}
 * 			showPreview
 * 			required
 * 		/>
 * 		<Button type='submit' buttonText='Submit' />
 * 	</Form>
 *</Formik>
 */
export default function FormikDropzone(props: FormikDropzoneProps): JSX.Element;
