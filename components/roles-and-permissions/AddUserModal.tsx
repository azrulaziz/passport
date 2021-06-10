import Modal from 'react-modal';
import {CloseOutlined} from '@ant-design/icons'
import AddUserForm from './AddUserForm';
import { useEffect } from 'react';

const AddUserModal = ({isOpen, onRequestClose}) => {

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
            className="mx-auto section-bg mt-24 sm:max-w-2xl overflow-auto outline-none  shadow-2xl"
            closeTimeoutMS={100}
        >
            <div className="">
                <div className="section-bg border-b dark:border-gray-7 px-12 pb-4 pt-4 flex justify-between items-start">
                    <div className="">
                        <h1 className="font-bold text-xl">Add a user</h1>
                        <p className="text-sm">Send an invitation to join 500.</p>
                    </div>
                    <CloseOutlined className="text-sm" onClick={() => onRequestClose()} />
                </div>
                <div className="bg-gray-2 dark:bg-gray-8 px-12 py-8">
                    <AddUserForm onRequestClose={onRequestClose} />
                </div>
            </div>
        </Modal>
    )
}

export default AddUserModal