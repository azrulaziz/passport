
const InlineTagPanel = ({title, data}) => {
    if (data.length < 1) return <></>
    return (
        <div className="flex items-center">
            <p className="w-1/3 text-sm">{title}:</p>
            <div className="w-2/3 space-x-1">
            {data.map(each => {
                return (
                    <p key={each} className="px-2 py-1 inline-block text-xs bg-gray-2 border border-gray-5 dark:bg-gray-8 rounded-sm">
                        {each}
                    </p>
                )
            })}

            </div>
        </div>
    )
}

export default InlineTagPanel