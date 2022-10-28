export interface FormikLabelSelect {
    name: string;
    isEdit: boolean;
    draftStatus: string;
    selectedLabels: Array<any>
}

/** The FormikLabelSelect is a component specifically used for the labels multi select.
 * It takes isEdit and draft status as a prop to differentiate between a draft post or a published post.
 * The selected labels is the array of object containing labels name and their ids.
 * 
 * ### Usage Example:
 * Following is the minimal example to demonstrate how you can use this component.
 * @example 
 * <Formik
 * 	initialValues={{ name: ''}}
 * 	onSubmit={(data) => {
 * 		console.log(data);
 * 	}}
 * >
 * 	<Form>
 * 		<FormikLabelsSelect
            name='labels' 
            isEdit={false || true}
            draftStatus={'status' || 'published'}
            ...restProps
        />
 * 		<button type='submit'>Submit</button>
 * 	</Form>
 * </Formik>
*/