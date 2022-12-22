export interface CheckboxProps {
	name: string;
	checked: boolean;
	label?: string;
	tooltip?: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onChange?: (value: boolean) => void;
	error?: string;
	disabled?: boolean;
}

/**
 * CheckBox is a component that is used in place for the switches responsible for enabling and disabling
 * a field. It takes name, id onBlur, onChange, and error as props.
 */
export default function CheckBox(props: CheckboxProps): JSX.Element;
