import FormContentPanel from "components/profile/FormContentPanel"
import SettingsSection from './SettingsSection'
import Switch from "react-switch"
import { useState } from "react"

const CommunicationPreferences = () => {
    return (
        <FormContentPanel id="communication preferences" title="Communication Preferences" subtitle="Control how you receive communications within 500.">
            <div className="space-y-6">
                <SettingsSection sectionName="Enable email notifications" sectionDescription="Allow email notifications">
                        <p className="text-gray-9 text-sm">Direct Messages</p>
                        <p className="text-gray-9 text-sm">Posts & comments</p>
                        <p className="text-gray-9 text-sm">News</p>
                        <p className="text-gray-9 text-sm">Program Applications</p>
                </SettingsSection>
                <hr />
                <InvitationsToConnect />
                <hr />
                <Messages />
            </div>
        </FormContentPanel>
    )
}
export default CommunicationPreferences

const InvitationsToConnect = () => {
    const [invitationToConnect, setInvitationToConnect] = useState(false)

    return (
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <label htmlFor="invitationsToConnect" className="text-gray-9 mb-1">Invitations to connect</label>
                <p className="text-xs text-gray-7 italic">
                    Allows user to send you invitations to connect
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0">
                <div className="w-full md:w-3/4">
                    <p className="text-gray-9 text-sm">{invitationToConnect ? "Yes" : "No"}</p>
                </div>
                <div className="w-full md:w-1/4 justify-end flex">
                    <div>
                        <Switch id="invitationsToConnect" onChange={(e) => setInvitationToConnect(e)} checked={invitationToConnect} uncheckedIcon={false} checkedIcon={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Messages = () => {
    const [messages, setMessages] = useState(false)

    return (
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <label htmlFor="messages" className="text-gray-9 mb-1">Messages</label>
                <p className="text-xs text-gray-7 italic">
                    Allows user to message you directly
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0">
                <div className="w-full md:w-3/4">
                    <p className="text-gray-9 text-sm">{messages ? "Yes" : "No"}</p>
                </div>
                <div className="w-full md:w-1/4 justify-end flex">
                    <div>
                        <Switch id="messages" onChange={(e) => setMessages(e)} checked={messages} uncheckedIcon={false} checkedIcon={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}