import { CheckboxProps } from '../../CheckBox';

interface FormikCheckboxProps
	extends Omit<CheckboxProps, 'checked' | 'onChange' | 'onBlur'> {
	onChange: (value: boolean) => void;
	onBlur: (value: boolean) => void;
}

/**
 * `FormikCheckboxProps` is a wrapper over `ToggleSwitchField` component. It accepts every prop which `ToggleSwitchField`
 * accepts but it can only use under the context of `Formik`.
 */
export default function FormikCheckbox(props: FormikCheckboxProps): JSX.Element;
