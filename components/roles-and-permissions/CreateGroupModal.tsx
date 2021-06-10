import Modal from 'react-modal';
import {CloseOutlined} from '@ant-design/icons'
import { useEffect } from 'react';
import {useForm} from "react-hook-form";
import {TextInputInline} from 'components/common/Input'
import {PrimaryButton} from 'components/common/Button'


const CreateGroupModal = ({isOpen, onRequestClose}) => {

    useEffect(() => {
        if (typeof(window) !== 'undefined') {
            Modal.setAppElement('body')
        }

    }, [])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(66, 66, 66, 0.91)',
                  zIndex: '99999',
                }
              }}
            className="mx-auto section-bg mt-36 sm:max-w-2xl overflow-auto outline-none shadow-2xl"
            closeTimeoutMS={100}
        >
            <div className="">
                <div className="section-bg border-b dark:border-gray-7 px-12 pb-4 pt-4 flex justify-between items-start">
                    <div className="">
                        <h1 className="font-bold text-xl">Create a New Group</h1>
                        <p className="text-sm">Please use descriptive group names for better targeting.</p>
                    </div>
                    <CloseOutlined className="text-sm" onClick={() => onRequestClose()} />
                </div>
                <div className="bg-gray-2 dark:bg-gray-8 px-12 py-8">
                    <GroupForm onRequestClose={onRequestClose} />
                </div>
            </div>
        </Modal>
    )
}

export default CreateGroupModal


type FormValue = {
    name: string
}

const GroupForm = ({onRequestClose}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>({});

    const handleCreateGroup = (data) => {
        console.log(data)
        onRequestClose()
    }
    
    return (
        <form onSubmit={handleSubmit(handleCreateGroup)} className="space-y-6">
            <TextInputInline
                register={register}
                errors={errors}
                inputName="name"
                placeholder="Fintech Evaluators"
                type="name"
                validation={{
                    required: "Please insert group name"
                }}
                labelClassName="profile-form-label"
                labelText={<span className="profile-form-label"><span className="text-red-600">* </span>Group Name</span>}
            />
            <div className="flex justify-end">
                <PrimaryButton type="submit" extraStyle="!py-1">Create Group</PrimaryButton>
            </div>
        </form>
    )
}