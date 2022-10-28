export interface ChipsSelectFieldProps {
	name: string;
	title: string;
	selectedData: Array<any>;
	placeholder: string;
	error: string;
	disabled: boolean;
	newData: Array<any>;
	options: Array<any>;
	isLoading: boolean;
	onChange: (field: string, value: Array<any>) => void;
	onSearchTextChange: (value: string) => void;
	onBlur: () => void;
}

/** The Chip Select Field is a reusable component that is to be used in place of the multi select.
 * It uses the Autocomplete component that is used to load and select the values with respect to the change in input field.
 * It is used with Formik that gives name, onChange, value -> selectedData, onBlur, and error as props.
 * isNotPublished={isEdit && draftStatus === 'draft'}
 */

export default function ChipsSelectField(
	props: ChipsSelectFieldProps
): JSX.Element;
