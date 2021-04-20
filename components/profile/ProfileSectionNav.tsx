import { Link, animateScroll as scroll } from "react-scroll";

const ProfileSectionNav = ({sections}) => {
    return (
        <nav className="my-8 text-gray-10 text-base space-y-8">

                {sections.map(each => {
                    return (
                        <div key={each} className="cursor-pointer capitalize">
                            <Link
                                activeClass="font-bold pb-2 text-primary-blue border-b-2 border-primary-blue"
                                to={each}
                                spy={true}
                                smooth={true}
                                offset={-150}
                                duration={500}
                            >
                                {each}
                            </Link>
                        </div>
                    )
                })}

                
        </nav>
    )
}

export default ProfileSectionNav