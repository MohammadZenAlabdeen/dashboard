import AddBtn from "../all-btn/main-btn/add-btn";
import CategoryesTable from "./categoryes-table";

function MainCategoryesPage({ role }) {

    return (

        <div className="container mx-auto flex flex-col ">
            <div className={role == 'user' ? 'hidden' : "mt-3 self-end"}><AddBtn href='/categoryes/add-categoryes'>Add Category</AddBtn></div>
            <CategoryesTable role={role} />
        </div>
    )
}

export default MainCategoryesPage
