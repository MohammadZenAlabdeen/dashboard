import SaveBtn from '../all-btn/main-btn/save-btn'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

function AddCategoryesPage() {

    const router = useRouter()

    const notify = (message) => toast(message);
    const [newCategory, setNewCategory] = useState(
        {
            name: ''
        }
    );

    const handleSubmit = async (e) => {

        e.preventDefault();

        let form = e.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries())

        setNewCategory(formDataObj); //formDataObj is Object {key:"value"}

        const apiUrl = '/api/categories';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory),
            });

            const data = await response.json();
            console.log('Add Category Done', data);
            notify(data.message)
            if (response.ok) {
                return router.push('/categoryes')
            }

        } catch (error) {
            console.log('Error Category User:', error);
        }
    };


    return (
        <div className="container mx-auto " onSubmit={handleSubmit}>
            <div className="py-4">
                <h1 className="text-3xl font-bold text-title-black">Add Category</h1>
            </div>
            <form className="mx-auto">
                <div className="mb-5 p-5 rounded-lg bg-light w-full ">
                    <label htmlFor="category" className="block mb-2   font-medium text-title-black dark:text-white">category name</label>
                    <input type="category" id="category" name='name' className="bg-light w-full  border border-secondary text-title-black font-bold  rounded-sm  focus:border-primary block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
                </div>
                <SaveBtn />
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddCategoryesPage
