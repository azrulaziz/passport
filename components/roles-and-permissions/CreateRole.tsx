import { PrimaryButton } from "components/ds/Button"
import { TextInputInline } from "components/common/Input"
import {useForm} from "react-hook-form";
import CreateRoleNav from "./CreateRoleNav";
import {useState} from 'react'
import {useRouter} from 'next/router'

const CreateRole = ({moduleData= []}) => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({});
    const [selectedModule, setSelectedModule] = useState(moduleData[0].module)
    const [module, setModule] = useState(moduleData)

    const handleCreateRole = (data) => {
        // console.log(data)
        router.push('/roles-permissions')

    }

    const renderSections = module.filter(x => x.module === selectedModule)

    const handleEachDefaultChecked = (each, allAccess, list, permissionType):boolean => {
        if (each.visibility && allAccess) {
            return true
        } else if (each.visibility && !allAccess && list[permissionType]) {
            return true
        } else if (each.visibility && !allAccess && !list[permissionType]) {
            return false
        } else {
            return false
        }
    }

    return (
        <form className="p-6 w-full bg-white dark:bg-gray-10" onSubmit={handleSubmit(handleCreateRole)}>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="pl-2 text-2xl font-bold">Create a new Role</h1>
                </div>
                <div className="">
                    <PrimaryButton type="submit" handleClick={() => {}}>Save Role</PrimaryButton>
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
                        <CreateRoleNav sections={module} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />
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
                                                    defaultChecked={each.visibility}
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
                                        <div className={`flex items-center p-3 border-b ${each.visibility ? "text-gray-7" :"text-gray-6 dark:text-gray-8"}`}>
                                            <div className="w-2/3 flex items-center text-sm">
                                                <p className="text-xs italic ">
                                                    Select all
                                                </p>
                                            </div>
                                            <div className="w-1/3 flex items-center justify-center text-center space-x-1 text-xs">
                                                <div className="w-1/3">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        disabled={!each.visibility}
                                                        defaultChecked={each.visibility ? each.allReadAccess : false}
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        disabled={!each.visibility}
                                                        defaultChecked={each.visibility ? each.allModifyAccess : false}
                                                    />
                                                </div>
                                                <div className="w-1/3 justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                        disabled={!each.visibility}
                                                        defaultChecked={each.visibility ? each.allWriteAccess : false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {each.permissionList.map(list => {
                                            return (
                                                <div className={`flex items-center p-3 border-b ${each.visibility ? "" : "text-gray-6 dark:text-gray-8"}`}>
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
                                                                disabled={!each.visibility}
                                                                defaultChecked={handleEachDefaultChecked(each, each.allReadAccess, list, 'read')}
                                                            />
                                                        </div>
                                                        <div className="w-1/3">
                                                            <input
                                                                type="checkbox"
                                                                className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                                disabled={!each.visibility}
                                                                defaultChecked={handleEachDefaultChecked(each, each.allModifyAccess, list, 'modify')}
                                                            />
                                                        </div>
                                                        <div className="w-1/3 justify-center">
                                                            <input
                                                                type="checkbox"
                                                                className="checked:bg-blue-600 checked:border-transparent w-3 h-3 pr-1"
                                                                disabled={!each.visibility}
                                                                defaultChecked={handleEachDefaultChecked(each, each.allWriteAccess, list, 'write')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateRole


