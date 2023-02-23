import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const permissionListing = [
	{
		type: 'LIBRARY',
		type_of: 'News',
		permissions: {
			create: true,
			edit: false,
			delete: false,
			read: true
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Media',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Articles',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Virals',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Questions',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Banners',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'Rules',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'LIBRARY',
		type_of: 'User Management',
		permissions: {
			create: false,
			edit: false,
			delete: false,
			read: false
		}
	},
	{
		type: 'FEATURE',
		type_of: 'Notifications',
		permissions: {
			create: false,
			edit: true,
			delete: false,
			read: false
		}
	}
];

const usePermissionsAccessControl = () => {
	const [permissions, setPermissions] = useState(undefined);

	useEffect(() => {
		const updatedPermissions = {};

		permissionListing.forEach((item) => {
			updatedPermissions[item.type_of] = {
				...item.permissions,
				hasAccess: false
			};

			if (
				item.permissions.create ||
				item.permissions.edit ||
				item.permissions.read ||
				item.permissions.delete
			) {
				updatedPermissions[item.type_of]['hasAccess'] = true;
			}
		});

		setPermissions(updatedPermissions);
	}, [permissionListing]);

	const getIsFieldInteractionAllowed = (typeOf, isEdit) => {
		if (!permissions || isEmpty(permissions[typeOf])) return false;
		return isEdit ? permissions[typeOf].edit : permissions[typeOf].create;
	};

	return { permissions, getIsFieldInteractionAllowed };
};

export default usePermissionsAccessControl;
