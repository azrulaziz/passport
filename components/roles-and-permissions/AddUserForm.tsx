import {useForm} from "react-hook-form";
import { TextInputInline, AsyncMultiSelectInsideInput } from 'components/common/Input';
import {PrimaryButton} from 'components/common/Button'

type SelectObj = {
    value: string
    label: string
}

interface FormValues {
    firstName: string
    lastName: string
    email: string
    productAccess: SelectObj[],
    role: SelectObj[]
}

const accessOptions = [
    { value: "500 Applications", label: "500 Applications"},
    { value: "Startup Support", label: "Startup Support"},
    { value: "Community Network", label: "Community Network"}
]

const AddUserForm = ({onRequestClose}) => {

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({});

    const handleAddUser = (data) => {
        console.log(data)
        onRequestClose()
    }

    return (
        <form onSubmit={handleSubmit(handleAddUser)} className="space-y-6">
            <TextInputInline
                register={register}
                errors={errors}
                inputName="firstName"
                placeholder="John"
                type="name"
                validation={{
                    required: "Please insert first name"
                }}
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>First Name</span>}
            />
            <TextInputInline
                register={register}
                errors={errors}
                inputName="lastName"
                placeholder="Smith"
                type="name"
                validation={{
                    required: "Please inset last name"
                }}
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>Last Name</span>}
            />
            <TextInputInline
                register={register}
                errors={errors}
                inputName="email"
                placeholder="johnsmith@company.co"
                type="email"
                validation={{
                    required: "Please insert email"
                }}
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>Email</span>}
            />
            <AsyncMultiSelectInsideInput 
                inputName="productAccess"
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>Grant Access</span>}
                control={control}
                optionsArray={accessOptions}
                placeholder="Choose which products to grant access to"
                defaultOptions
                rules={{required: "Please select which products to grant access to"}}
            />
            <AsyncMultiSelectInsideInput 
                inputName="role"
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>Designate Role</span>}
                control={control}
                optionsArray={accessOptions}
                placeholder="Type the roles here"
                rules={{required: "Please type roles to designate to user "}}
            />
            <div className="flex justify-end">
                <PrimaryButton type="submit" extraStyle="py-1">Invite User</PrimaryButton>
            </div>
        </form>
    )
}

export default AddUserForm