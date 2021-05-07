import { Link, animateScroll as scroll } from "react-scroll";
import ScrollMenu from 'react-horizontal-scrolling-menu'; 
import { useState } from "react";
import {ArrowLeft, ArrowRight} from "../common/HorizontalScrollArrow"

export const NavSectionScroll = ({sections}) => {
    const [selected, setSelected] = useState('introduction')

    const renderMenu = (sections) => {
        let menu = sections.map(each => {
            return (
                <div key={each} className="cursor-pointer capitalize leading-7 mx-4 text-center py-2 " style={{minWidth: '7rem'}}>
                    <Link
                        activeClass="font-bold pb-1 text-primary-blue border-b-2 leading-7 border-primary-blue"
                        to={each}
                        spy={true}
                        smooth={true}
                        offset={-150}
                        duration={500}
                        onClick={() => setSelected(each)}
                        onSetActive={() => setSelected(each)}
                    >
                        {each}
                    </Link>
                </div>
            )
        })
        return menu  
    }

    return (
        <div className="w-full md:hidden px-2">
            <ScrollMenu
                alignCenter={false}
                data={renderMenu(sections)}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                innerWrapperClass=""
                wrapperClass=" mx-2 w-full"
                selected={selected}
                scrollToSelected={true}
            />
        </div>
    )
}