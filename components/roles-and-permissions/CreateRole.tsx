import { PrimaryButton } from "components/common/Button"
import { TextInputInline } from "components/common/Input"
import ProfileSectionNav from "components/profile/ProfileSectionNav";
import {useForm} from "react-hook-form";
import CreateRoleNav from "./CreateRoleNav";
import {useState} from 'react'

const CreateRole = ({moduleData}) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({});
    const [selectedModule, setSelectedModule] = useState(moduleData[0].module)
    const handleCreateRole = (data) => {
        // console.log(data)
    }

    const renderSections = moduleData.filter(x => x.module === selectedModule)
    console.log(renderSections[0].sections)

    return (
        <form className="p-6 w-full bg-white dark:bg-gray-10" onSubmit={handleSubmit(handleCreateRole)}>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="pl-2 text-2xl font-bold">Create a new Role</h1>
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
                    <div className="w-1/3 my-6">
                        <CreateRoleNav sections={moduleData} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />
                    </div>
                    <div className="w-full">
                            {renderSections[0].sections.map(each => {
                                return (
                                    <div className="w-full border my-6">
                                        <div className="flex items-center bg-gray-2 dark:bg-gray-8 p-3">
                                            <div className="w-2/3 flex items-center text-sm">
                                                <input
                                                    type="checkbox"
                                                    className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                />
                                                <p className="font-bold ml-4">{each.name}</p>
                                            </div>
                                            <div className="w-1/3 flex items-center text-center space-x-1 text-xs">
                                                <div className="w-1/3">
                                                    <p>Read</p>
                                                </div>
                                                <div className="w-1/3">
                                                    <p>Modify</p>
                                                </div>
                                                <div className="w-1/3">
                                                    <p>Write</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 border-b">
                                            <div className="w-2/3 flex items-center text-sm">
                                                <p className="text-xs italic text-gray-7">
                                                    Select all
                                                </p>
                                            </div>
                                            <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                                <div className="w-1/3">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                    />
                                                </div>
                                                <div className="w-1/3 justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 border-b">
                                        {each.permissionList.map(list => {
                                            return (
                                                <div>
                                                <div className="w-2/3 flex items-center text-sm">
                                                    <p className="text-xs">
                                                        {list.type}
                                                    </p>
                                                </div>
                                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                                    <div className="w-1/3">
                                                        <input
                                                            type="checkbox"
                                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        />
                                                    </div>
                                                    <div className="w-1/3">
                                                        <input
                                                            type="checkbox"
                                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        />
                                                    </div>
                                                    <div className="w-1/3 justify-center">
                                                        <input
                                                            type="checkbox"
                                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    {/* <div className="w-full">
                        <div className="w-full border my-6">
                            <div className="flex items-center bg-gray-2 dark:bg-gray-8 p-3">
                                <div className="w-2/3 flex items-center text-sm">
                                    <input
                                        type="checkbox"
                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                    />
                                    <p className="font-bold ml-4">Program Applications</p>
                                </div>
                                <div className="w-1/3 flex items-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <p>Read</p>
                                    </div>
                                    <div className="w-1/3">
                                        <p>Modify</p>
                                    </div>
                                    <div className="w-1/3">
                                        <p>Write</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border-b">
                                <div className="w-2/3 flex items-center text-sm">
                                    <p className="text-xs italic text-gray-7">
                                        Select all
                                    </p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border-b">
                                <div className="w-2/3 flex items-center text-sm">
                                    <p className="text-xs">
                                        View dashboard
                                    </p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border-b">
                                <div className="w-2/3 flex items-center text-sm">
                                    <p className="text-xs">
                                        Start an application form
                                    </p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-3 border-b">
                                <div className="w-2/3 flex items-center text-sm">
                                    <p className="text-xs">
                                        Submit an application form
                                    </p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center p-3">
                                <div className="w-2/3 flex items-center text-sm">
                                    <p className="text-xs">
                                        View application progress
                                    </p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                    <div className="w-1/3 justify-center">
                                        <input
                                            type="checkbox"
                                            className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </form>
    )
}

export default CreateRole


