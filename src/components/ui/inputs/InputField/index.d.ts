import { TextFieldProps } from '@material-ui/core';

export type InputFieldProps = Omit<TextFieldProps, 'variant'> & {
	name: string;
	label?: string;
	rightLabel?: string;
	textArea?: boolean;
	required?: boolean;
	isError?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	height?: 'small' | 'medium' | 'large';
};

/**
 *
 * The `InputField` is a wrapper over `Material UI TextField` component but styled according to project needs.
 * You can pass every prop which is a valid `TextField` prop. It also includes some extra props as required by our use case.
 */
export default function InputField(props: InputFieldProps): JSX.Element;
