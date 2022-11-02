import { ToggleSwitchFieldProps } from '../../ToggleSwitchField';

interface FormikSwitchFieldProps
	extends Omit<ToggleSwitchFieldProps, 'checked' | 'onChange' | 'onBlur'> {
	onChange: (name: string, value: boolean) => void;
	onBlur: (name: string, value: boolean) => void;
}

/**
 * `FormikSwitchField` is a wrapper over `ToggleSwitchField` component. It accepts every prop which `ToggleSwitchField`
 * accepts but it can only use under the context of `Formik`.
 */
export default function FormikSwitchField(
	props: FormikSwitchFieldProps
): JSX.Element;
