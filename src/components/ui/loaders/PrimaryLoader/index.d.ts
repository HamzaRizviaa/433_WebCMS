export interface PrimaryLoaderProps {
    loading: bool, 
    children: element, 
    mainPage: bool, 
    secondary: bool
}

/* The "PrimaryLoader" component is a wrapper that will be used in place for the loading overlay and secondary loader */

export default function PrimaryLoader(props: PrimaryLoaderProps): JSX.Element