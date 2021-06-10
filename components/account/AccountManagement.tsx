import FormContentPanel from "components/profile/FormContentPanel"
import SettingsSection from './SettingsSection'
import Switch from "react-switch"
import { useState } from "react"

const AccountManagement = () => {

    return (
        <FormContentPanel id="account management" title="Account Management" subtitle="Control your 500 Passport account.">
            <div className="space-y-6">
                <SettingsSection sectionName="Set Timezone" sectionDescription="Change your timezone settings">
                        <p className=" text-sm">UTC−06:00 (CT) — Central Time zone</p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Set Language" sectionDescription="Change your default language">
                        <p className=" text-sm">English</p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Deactivate Account" sectionDescription="Temporarily deactivate your account">
                        <p className=" text-sm"></p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Delete Account" sectionDescription="Learn about deleting your account">
                        <p className=" text-sm"></p>
                </SettingsSection>
            </div>
        </FormContentPanel>
    )
}
export default AccountManagement

const DeactivateAccount = () => {
    const [deactivateAccount, setDeactivateAccount] = useState(false)

    return (
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <label htmlFor="deactivateAccount" className="text-gray-9 mb-1">Deactivate Account</label>
                <p className="text-xs text-gray-7 italic">
                    Temporarily deactivate your account
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0">
                <div className="w-full md:w-3/4">
                    <></>
                </div>
                <div className="w-full md:w-1/4 justify-end flex">
                    <Switch id="deactivateAccount" onChange={(e) => setDeactivateAccount(e)} checked={deactivateAccount} uncheckedIcon={false} checkedIcon={false} />
                </div>
            </div>
        </div>
    )
}

const DeleteAccount = () => {
    const [deleteAccount, setDeleteAccount] = useState(false)

    return (
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <label htmlFor="deleteAccount" className="text-gray-9 mb-1">Delete Account</label>
                <p className="text-xs text-gray-7 italic">
                    Learn about deleting your account
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0">
                <div className="w-full md:w-3/4">
                    <></>
                </div>
                <div className="w-full md:w-1/4 justify-end flex">
                    <div>
                        <Switch id="deleteAccount" onChange={(e) => setDeleteAccount(e)} checked={deleteAccount} uncheckedIcon={false} checkedIcon={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}