import CommunicationPreferences from "./CommunicationPreferences"
import InformationAndSecurity from "./InformationAndSecurity"
import ProfileSectionNav from 'components/profile/ProfileSectionNav'
import AccountManagement from "./AccountManagement"
import ModuleManagement from "./ModuleManagement"
import {NavSectionScroll} from 'components/profile/ProfileSectionNavMobile'

const sections = ['information & security', 'communication preferences', 'account management', 'module management']

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
              <div className="lg:p-6 py-1 sticky md:top-20">
                <ProfileSectionNav sections={sections} />
                <NavSectionScroll sections={sections}/>
              </div>
            </div>
        </div>
    )
}

export default AccountSettings