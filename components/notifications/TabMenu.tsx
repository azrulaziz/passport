

const items = ['Notifications', 'Activity', 'Requests']

const TabMenu = ({selected, setSelectedTab}) => {
    return (
        <div className="flex border-b dark:border-secondary-gray text-base px-2 pt-2 sticky top-0 mt-0 section-bg">
            {items.map(each => {
                return (
                    <div 
                        className={`cursor-pointer py-2 mx-2 text-center w-1/3 ${selected === each ? "font-bold border-b-2 pb-4 border-primary-blue text-primary-blue" : ""}`} 
                        onClick={() => setSelectedTab(each)}
                        key={each}
                    >
                        <p>{each}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default TabMenu