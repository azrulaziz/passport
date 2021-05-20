import { PrimaryButton } from "components/common/Button"
import { TextInputInline } from "components/common/Input"
import ProfileSectionNav from "components/profile/ProfileSectionNav";
import {useForm} from "react-hook-form";

const CreateRole = ({moduleSections}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({});

    const handleCreateRole = (data) => {
        console.log(data)
    }
    return (
        <form className="p-6 w-full bg-white dark:bg-gray-10" onSubmit={handleSubmit(handleCreateRole)}>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="pl-2 text-2xl font-bold">Create Role</h1>
                </div>
                <div className="">
                    <PrimaryButton type="submit">Save Role</PrimaryButton>
                </div>
            </div>
            <hr />
            <div className="p-6">
                <div className="mb-2">
                    <TextInputInline 
                        errors={errors}
                        inputName="roleName"
                        labelClassName="profile-form-label py-1"
                        labelText="New Role Name:"
                        placeholder="Type role name"
                        register={register}
                        type="text"
                        validation={{}}
                        className="border border-gray-5 py-2 px-2 w-2/3 block rounded text-sm"
                    />
                </div>

                <div className="flex space-x-1">
                    <div className="w-1/3 ">
                        <ProfileSectionNav sections={moduleSections} />
                    </div>
                    <div className="w-full border p-4 my-6">
                        
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateRole