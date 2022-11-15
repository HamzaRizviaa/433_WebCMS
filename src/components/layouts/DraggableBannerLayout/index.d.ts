interface BannerContent {
	id: string;
	title: string;
	type: string;
}

interface BannerItem {
	id: string;
	banner_type: string;
	content: BannerContent;
	sort_order: number;
}

export interface DraggableBannerLayoutProps {
	item: BannerItem;
	index: number;
	errorMsg: string;
	onDeleteIconClick: (item: BannerItem) => void;
	children: JSX.Element[] | JSX.Element;
}

/* 
'index.d.ts' is a declaration file used for  inteliSense and for making it easier to understand 
what is happening in the code. It is not NECESSARY but used for documentation to understand the structure
of the component
*/

/** Draggable Header is a component that needs to be used where there is a need of a draggable field.
 * It takes item as a prop that contains the heading related to the specific field where it is used.
 * Also contains the delete icon that deletes the specific element.
 */

export default function DraggableBannerLayout(
	props: DraggableBannerLayoutProps
): JSX.Element;
