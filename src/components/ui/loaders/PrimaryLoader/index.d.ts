export interface PrimaryLoaderProps {
	loading: boolean;
	children?: JSX.Element[] | JSX.Element;
	mainPage?: boolean;
	secondary?: boolean;
	opaqueBackground?: boolean;
	fullHeight?: boolean;
}

/** The "PrimaryLoader" component is a wrapper that is used to show the loading.
 * This will be used in place for the loading overlay component and the secondary loader component
 * that is being used on the main libraries and their sub pages
 */

export default function PrimaryLoader(props: PrimaryLoaderProps): JSX.Element;
