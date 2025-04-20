import { TiThMenu } from "react-icons/ti";

function ShowMenuBtn() {
  return (
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex  items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <TiThMenu className="text-2xl text-secondary" />
    </button>
  )
}

export default ShowMenuBtn

