import FormContentPanel from "components/profile/FormContentPanel"
import SettingsSection from './SettingsSection'

const ModuleManagement = () => {
    return (
        <FormContentPanel id="module management" title="Module Management" subtitle="Control your access within the 500 platform.">
            <div className="space-y-6">
                <ModuleSection
                    sectionName="Perk Management"
                    sectionDescription="Perk management"
                    button={<ModuleAccessButton style="border-gray-5 text-gray-6" type="button" disabled={true}>Default Access</ModuleAccessButton>}
                >
                    <div className="">
                        <p className="border border-gray-5 dark:bg-gray-8 inline-block px-2 py-1 rounded-sm bg-gray-2">Member</p>
                    </div>
                </ModuleSection>
                <ModuleSection
                    sectionName="Community Network"
                    sectionDescription="Forum & people directory"
                    button={<ModuleAccessButton style="border-gray-5 text-gray-6" type="button" disabled={true}>Default Access</ModuleAccessButton>}
                >
                    <div className="">
                        <p className="border border-gray-5 dark:bg-gray-8 inline-block px-2 py-1 rounded-sm bg-gray-2">Member</p>
                    </div>
                </ModuleSection>
                <ModuleSection
                    sectionName="Startup Support"
                    sectionDescription="Resource & network referrals"
                    button={<ModuleAccessButton style="border-gray-5 text-gray-6" type="button" disabled={true}>Default Access</ModuleAccessButton>}
                >
                    <div className="">
                        <p className="border border-gray-5 dark:bg-gray-8 inline-block px-2 py-1 rounded-sm bg-gray-2">Member</p>
                    </div>
                </ModuleSection>
                <hr />
                <ModuleSection
                    sectionName="500 Applications"
                    sectionDescription="Program Application Management"
                    button={<ModuleAccessButton style="border-gray-9 dark:border-gray-1 dark:text-gray-1 text-gray-9" type="button" disabled={true}>I no longer need access</ModuleAccessButton>}
                >
                    <div className="space-x-1 space-y-1">
                        <p className="border inline-block text-xs border-gray-5 dark:bg-gray-8 px-2 py-1 rounded-sm bg-gray-2">Member</p>
                        <p className="border inline-block text-xs border-gray-5 dark:bg-gray-8 px-2 py-1 rounded-sm bg-gray-2">Applicant</p>
                        <p className="border inline-block text-xs border-gray-5 dark:bg-gray-8 px-2 py-1 rounded-sm bg-gray-2">Manager</p>
                    </div>
                </ModuleSection>
                <hr />
            </div>
        </FormContentPanel>
    )
}
export default ModuleManagement

const ModuleSection = ({sectionName, sectionDescription, children, button}) => {
    return (
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <p className="text-gray-9 mb-1">{sectionName}</p>
                <p className="text-xs text-gray-7 italic">
                    {sectionDescription}
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0 ">
                <div className="md:w-2/3 text-xs">
                    {children}
                </div>
                <div className="w-full md:w-1/3 justify-end flex text-sm">
                    {button}
                </div>
            </div>
        </div>
    )
}

const ModuleAccessButton = ({style = "", children, type, disabled}) => {
    return (
        <button className={`${style} border py-1 rounded-sm px-2`} disabled={disabled} type={type}>
            {children}
        </button>
    )
}