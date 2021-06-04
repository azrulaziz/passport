import ScrollMenu from 'react-horizontal-scrolling-menu'; 
import { useRouter } from 'next/router'
import {ArrowLeft, ArrowRight} from "../common/HorizontalScrollArrow"
import {useState} from 'react'

const TabsItem = ({selected, name}) => {
    const router = useRouter()
    return (
        <a className={` ${selected === name ? "border-b-4 pb-3 border-primary-blue text-primary-blue" : ""}`}>
            {name}
        </a>
    )
}

const productListArr = ["500 Applications", "Acc. Mgmt & Facilitation", "Mentor & Expert App Mgmt", "Perk Mgmt", "Startup suppport", "Community Network"]

const ProductTabs = ({initialTab}) => {
    const [selected, setSelected] = useState(initialTab)

    const renderHorizontalMenu = () => {
        let menu = productListArr.map(each => {
            return (
                <div key={each} className="relative cursor-pointer capitalize pb-4 pt-4 mx-4 text-center text-xs" style={{minWidth: '8rem'}}>
                    <TabsItem selected={selected} name={each} />
                </div>
            )
        })
        return menu  
    }

    return (
        <div className="">
            <hr />
            <nav className="">
                <ScrollMenu
                    hideArrows={true}
                    alignCenter={false}
                    data={renderHorizontalMenu()}
                    arrowLeft={ArrowLeft}
                    menuStyle={{width: '100%', zIndex: -1}}
                    arrowRight={ArrowRight}
                    innerWrapperClass=""
                    wrapperClass=" mx-2 w-full "
                    selected={selected}
                    scrollToSelected={true}
                    onSelect={(key) => setSelected(key)} // change to another function, append query params & add product_name
                />
            </nav>
            <hr />
        </div>
    )
}

export default ProductTabs