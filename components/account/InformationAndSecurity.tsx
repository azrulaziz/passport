import FormContentPanel from "components/profile/FormContentPanel"
import SettingsSection from './SettingsSection'

const InformationAndSecurity = () => {
    return (
        <FormContentPanel id="information & security" title="Information & Security" subtitle="Settings to help you keep your account secure.">
            <div className="space-y-6">
                <SettingsSection sectionName="Email Addresses" sectionDescription="Add or remove email addresses.">
                        <p className="text-gray-9 text-sm">claytonbryan@500startups.com (primary)</p>
                        <p className="text-gray-9 text-sm">claytonbryan@gmail.com </p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Phone Numbers" sectionDescription="In case you have trouble signing in">
                        <p className="text-gray-7 text-sm">No numbers linked. Add one now.</p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Change Password" sectionDescription="Protect your account with a unique password">
                        <p className="text-gray-7 text-sm">•••••••••••••</p>
                </SettingsSection>
                <hr />
                <SettingsSection sectionName="Current Sessions" sectionDescription="See your active sessions">
                    <p className="text-gray-9 text-sm">2 active sessions</p>
                </SettingsSection>
            </div>
        </FormContentPanel>
    )
}
export default InformationAndSecurity