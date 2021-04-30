import CommunicationPreferences from "./CommunicationPreferences"
import InformationAndSecurity from "./InformationAndSecurity"
import ProfileSectionNav from 'components/profile/ProfileSectionNav'
import AccountManagement from "./AccountManagement"
import ModuleManagement from "./ModuleManagement"

const AccountSettings = () => {

    return (
        <div className="edit-profile-form">
            <div className="edit-profile-main">
                <InformationAndSecurity />
                <CommunicationPreferences />
                <AccountManagement />
                <ModuleManagement />
            </div>

            <div className="edit-profile-side">
              <div className="p-6 sticky top-20">
                <ProfileSectionNav sections={['information & security', 'communication preferences', 'account management', 'module management']} />
              </div>
            </div>
        </div>
    )
}

export default AccountSettings