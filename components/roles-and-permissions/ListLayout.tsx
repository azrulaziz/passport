import { PrimaryButton } from "components/common/Button"
import ProductTabs from './ProductTabs'

interface Props {
    children: React.ReactNode
}

const ListLayout = ({title, buttonText, buttonFunction, children, initialTab}) => {
    return (
        <div className="p-6 w-full bg-white dark:bg-gray-10">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="pl-2 text-2xl font-bold">{title}</h1>
                </div>
                <div className="">
                    <PrimaryButton type="button" onClick={() => buttonFunction()}>{buttonText}</PrimaryButton>
                </div>
            </div>
            <ProductTabs initialTab={initialTab} />

            <div className="">
                {children}
            </div>

        </div>
    )
}

export default ListLayout