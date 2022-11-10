export interface ToggleSwitchFieldProps {
	name: string;
	checked: boolean;
	label?: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onChange?: (value: boolean) => void;
	error?: string;
	small?: boolean;
	disabled?: boolean;
}

/**
 * Toggle Switch field is a component that is used in place for the switches responsible for enabling and disabling
 * a field. It takes name, id onBlur, onChange, and error as props.
 */
export default function ToggleSwitchField(
	props: ToggleSwitchFieldProps
): JSX.Element;
