'use client'
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Spinner from "../main-spinner/spinner"; 
import SaveBtn from "@/components/all-btn/main-btn/save-btn";
import { useRouter } from 'next/navigation';

function EditRolePage({ roleId }) {
    const router = useRouter();
    const notify = (message) => toast(message);

    const [role, setRole] = useState(null);
    const [permissionsArray, setPermissionsArray] = useState([]);
    const [newRole, setNewRole] = useState({ role: '', permissions: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roleResponse = await fetch(`/api/roles/${roleId}`);
                const roleData = await roleResponse.json();
                const rolePermissions = roleData.role.permissions;
                setRole(roleData.role);
                setNewRole({ role: roleData.role.name, permissions: rolePermissions.map(permission => permission._id) });

                const allPermissionsResponse = await fetch('/api/permissions');
                const allPermissionsData = await allPermissionsResponse.json();
                const allPermissions = allPermissionsData.permissions;

                const combinedPermissions = allPermissions.map(permission => ({
                    id: permission._id,
                    name: permission.name,
                    checked: rolePermissions.some(rolePermission => rolePermission._id === permission._id)
                }));

                if (Array.isArray(combinedPermissions)) {
                    setPermissionsArray(combinedPermissions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [roleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRole = {
            ...newRole,
            role: newRole.role || role.name,
        };

        const apiUrl = `/api/roles/${roleId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedRole),
            });

            const data = await response.json();

            if (response.ok) {
                notify('Role updated successfully!');
                return router.push('/users');
            }

            notify(data.message);
        } catch (error) {
            console.error('Error updating role:', error);
            notify('An error occurred while updating the role.');
        }
    };

    const addSinglePermission = (e) => {
        const permissionId = e.target.value;
        const permissionCheck = e.target.checked;

        const updatedPermissions = permissionCheck
            ? [...newRole.permissions, permissionId]
            : newRole.permissions.filter(id => id !== permissionId);

        setNewRole({ ...newRole, permissions: updatedPermissions });
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto">
            <div className="py-4">
                <h1 className="text-3xl font-bold text-title-black">Edit Role</h1>
            </div>

            <form className="mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5 p-5 rounded-lg bg-light w-full">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-title-black dark:text-white">
                        Role Name
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={newRole.role}
                        onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                        id="role"
                        className="bg-light w-full sm:w-2/3 md:w-1/3 border border-secondary text-title-black font-bold text-sm rounded-sm focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={role?.name || "Role Name"}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5 rounded-lg p-5 mb-4 bg-light">
                    {permissionsArray.map(permission => (
                        <div key={permission.id}>
                            <div className="flex items-center ps-4 border border-secondary rounded-lg dark:border-gray-700">
                                <input
                                    id={permission.id}
                                    type="checkbox"
                                    checked={newRole.permissions.includes(permission.id)}
                                    onChange={addSinglePermission}
                                    name="permission"
                                    value={permission.id}
                                    className="w-4 h-4 text-light bg-primary border-title-thirdly rounded-sm dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={permission.id} className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {permission.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                <SaveBtn />
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditRolePage;
