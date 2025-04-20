import AddUserForm from "./add-user-form";

function AddUserPage() {

  return (
    <div className="container mx-auto pb-20">
      <div className="py-4">
        <h1 className="text-3xl font-bold text-title-black">Add User</h1>
      </div>
      <AddUserForm />
    </div>
  )
}

export default AddUserPage
