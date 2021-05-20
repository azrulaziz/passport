

const SectionPanel = ({children, icon, panelTitle}) => {
    return (
        <div className="section-bg px-5 py-6">
            <div className="mb-2 flex items-center space-x-2">
                {icon}
                <h1 className="text-base font-black">{panelTitle}</h1>
            </div>
            <div className="space-y-4 dark:text-gray-1">
                {children}
            </div>
        </div>
    )
}

export default SectionPanel