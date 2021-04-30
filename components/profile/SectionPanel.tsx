

const SectionPanel = ({children, icon, panelTitle}) => {
    return (
        <div className="bg-white px-5 py-6">
            <div className="mb-2 flex items-center space-x-2">
                {icon}
                <h1 className="text-base text-gray-10 font-black">{panelTitle}</h1>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}

export default SectionPanel