export interface ToggleSwitchFieldProps {
    name: string;
    id: number;
    onBlur: () => void;
    onChange: (field: string, value: any) => void;
    onInputChange: (field: boolean, value: any) => void;
    error: string
}

/**Toggle Switch field is a component that is used in place for the switches
 * responsible for enabling and disabling a field.
 * it takes name, id onBlur, onChange, and error as props from the formik switch field
 * the onInputChange is a function to be used as the onChange for the switch
*/

export default function ToggleSwitchField(props: ToggleSwitchFieldProps):JSX.Element;