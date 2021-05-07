import { PrimaryButton } from "components/common/Button"
import ProductTabs from './ProductTabs'

interface Props {
    children: React.ReactNode
}

const ListLayout = ({title, buttonText, children, initialTab}) => {
    return (
        <div className="p-6 w-full bg-white">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h3 className="pl-2 text-2xl font-bold">{title}</h3>
                </div>
                <div className="">
                    <PrimaryButton type="button">{buttonText}</PrimaryButton>
                </div>
            </div>
            <ProductTabs initialTab={initialTab} />

            <div className="my-6">
                {children}
            </div>

        </div>
    )
}

export default ListLayout