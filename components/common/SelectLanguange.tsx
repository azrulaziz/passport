import Link from "next/link";
import { useRouter } from "next/router";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useState} from 'react'

const SelectLanguage: React.FC = () => {
    let router = useRouter();
    const [open, setOpen] = useState(false);

    const handleClickAway = () => {
      setOpen(false)
    }

    const handleSelectLang = () => {
      setOpen((prev) => !prev)
    }

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="mx-4 mb-4 md:mx-8 flex justify-end uppercase text-base align-middle text-secondary-gray relative">
          <div className=" pr-2 flex items-center cursor-pointer" onClick={handleSelectLang}>
            <div>
              <img src={`${router.locale}.svg`} alt="flag image" className="w-6 mb-1 mx-1" />
            </div>
            <p className="">{router.locale}</p>
          </div>
          {open ? 
            <ul className=" bg-white absolute -top-24 p-2 shadow-lg">
              
              {router.locales.map((locale) => (
                <li key={locale}>
                  <Link href={router.asPath} locale={locale}>
                    <div className="flex items-center cursor-pointer my-1">
                      <img src={`${locale}.svg`} alt="flag image" className="w-6 mb-1 mx-1" />
                      <a className={`uppercase text-base text-secondary-gray ${locale === router.locale ? "font-semibold" : ""}`}>{locale}</a>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            :
            null
          }

        </div>
      </ClickAwayListener>
    )
}

export default SelectLanguage

