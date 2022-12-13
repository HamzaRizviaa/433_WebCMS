import { ReactDatePickerProps } from 'react-datepicker';

export interface InlineDatePickerProps extends ReactDatePickerProps {
	label?: string;
	error?: string;
	required?: boolean;
}

/**
 *
 * The `InlineDatePicker` is a wrapper over `React-Datepicker` library component with customized input field and
 * styled according to project UI. You can pass every prop which is a valid `React-Datepicker` prop. It also
 * includes some extra props like `label`, `error`, etc. as required by our use case.
 */
export default function InlineDatePicker(
	props: InlineDatePickerProps
): JSX.Element;
