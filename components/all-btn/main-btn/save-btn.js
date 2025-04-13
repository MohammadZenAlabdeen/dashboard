import { FaRegSave } from "react-icons/fa";

function SaveBtn() {
    return (
        <button type="submit" className=" bg-primary text-light py-2.5 px-15 text-lg font-bold rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-title-black">
            <FaRegSave />
            <p>Save</p>
        </button>
    )
}

export default SaveBtn
