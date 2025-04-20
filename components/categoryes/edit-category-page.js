'use client'
import SaveBtn from '../all-btn/main-btn/save-btn'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../main-spinner/spinner";
import { useRouter } from 'next/navigation'

function EditCatygoryPage({ userId }) {
    const router = useRouter()
    const notify = (message) => toast(message);

    const [category, setCategory] = useState(null);
    const [newCategory, setNewCategory] = useState(
        {
            name: ''
        }
    );

    useEffect(() => {
        try {
            async function fetchCategory() {
                const res = await fetch(`/api/categories/${userId}`)
                const data = await res.json()
                setCategory(data)
            }
            fetchCategory()


        } catch (error) {
            console.log(error)
        }
    }, [newCategory])

    console.log(category);

    if (!category) return <Spinner />


    const handleSubmit = async (e) => {

        e.preventDefault();

        let form = e.target;
        let formData = new FormData(form);
        let formDataObj = Object.fromEntries(formData.entries())

        setNewCategory(formDataObj); //formDataObj is Object {key:"value"}

        const apiUrl = `/api/categories/${userId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
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
                <h1 className="text-3xl font-bold text-title-black">Edit Category</h1>
            </div>

            <form className="mx-auto">

                <div className="mb-5 p-5 rounded-lg bg-light w-full ">
                    <label htmlFor="category" className="block mb-2   font-medium text-title-black dark:text-white">category name</label>
                    <input type="category" id="category" name='name' className="bg-light w-full  border border-secondary text-title-black font-bold  rounded-sm  focus:border-primary block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={category.category.name} required />
                </div>

                <SaveBtn />
            </form>
            <ToastContainer />
        </div>
    )

}

export default EditCatygoryPage
