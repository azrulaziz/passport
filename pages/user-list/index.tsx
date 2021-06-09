import React, {useEffect, useState} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import ListLayout from 'components/roles-and-permissions/ListLayout'
import UserListTable from 'components/roles-and-permissions/UserListTable'
import {useHeaderTitle} from 'store/useHeaderTitle'
import AddUserModal from 'components/roles-and-permissions/AddUserModal'
import {SearchOutlined, CloseOutlined} from '@ant-design/icons'
// import { PrimaryButton } from 'components/common/Button'
import {PrimaryButton} from 'components/ds/Button'
import BulkActionSelect from 'components/roles-and-permissions/BulkActionSelect'

const optionsArray = [
  {value: "Add to group", "label": "Add to group"},
  {value: "Remove from group", "label": "Remove from group"}
]

export default function UserList() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: User List`)
  }, [])

  const data = React.useMemo(
    () => [
      {
        name: "Chantelle Beech",
        roles: ["member", "applicant", "manager", "evaluator"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 07 2021 16:51:21 GMT+0800",

      },
      {
        name: "Karper Watt",
        roles: ["member"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "James Moore",
        roles: ["member", "manager"],
        lastActive: "Fri May 03 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
      {
        name: "Deen Reeves",
        roles: ["member", "applicant", "evaluator"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 06 2021 16:51:21 GMT+0800",
      },
      {
        name: "Iman Watt",
        roles: ["member"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "Hadiya Couch",
        roles: ["admin"],
        lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
        joined: "Fri May 04 2021 16:51:21 GMT+0800",
      },
      {
        name: "Jordana Houston",
        roles: ["admin", "member"],
        lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
      {
        name: "Watter Lopp",
        roles: ["member"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "Peet Coych",
        roles: ["member"],
        lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
        joined: "Fri May 04 2021 16:51:21 GMT+0800",
      },
      {
        name: "Jordan Hoton",
        roles: ["admin", "member"],
        lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
      {
        name: "Norris Hunt",
        roles: ["member", "applicant",  "evaluator"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 07 2021 16:51:21 GMT+0800",

      },
      {
        name: "Tim Cavil",
        roles: ["member", "manager"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "Sonny More",
        roles: ["member", "manager"],
        lastActive: "Fri May 03 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
      {
        name: "Harden Lee",
        roles: ["evaluator"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 06 2021 16:51:21 GMT+0800",
      },
      {
        name: "Kimi Rai",
        roles: ["member", "applicant"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "Leclerc",
        roles: ["admin", "evaluator"],
        lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
        joined: "Fri May 04 2021 16:51:21 GMT+0800",
      },
      {
        name: "Carlos Sain",
        roles: ["admin", "member"],
        lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
      {
        name: "Valteri Bota",
        roles: ["member"],
        lastActive: "Fri May 07 2021 16:51:21 GMT+0800",
        joined: "Fri May 02 2021 16:51:21 GMT+0800",
      },
      {
        name: "Max Stapen",
        roles: ["admin"],
        lastActive: "Fri May 05 2021 16:51:21 GMT+0800",
        joined: "Fri May 04 2021 16:51:21 GMT+0800",
      },
      {
        name: "Lewes Hilton",
        roles: ["member"],
        lastActive: "Fri May 02 2021 16:51:21 GMT+0800",
        joined: "Fri May 01 2021 16:51:21 GMT+0800",
      },
    ],
    []
  )

  return (
    <RoleLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <AddUserModal isOpen={isOpen} onRequestClose={handleCloseModal} />
      <ListLayout title="User List" buttonText="Add User" buttonFunction={handleOpenModal} initialTab="500 Applications">
          <div className="flex flex-wrap w-full mb-2 px-2 py-3 items-center space-y-2 lg:space-y-0">
            <div className="w-full lg:w-3/12 flex items-center space-x-2">
              <div className="w-2/3">
                  <BulkActionSelect optionsArray={optionsArray} />
              </div>
              <div className="w-1/3">
                  <PrimaryButton type="button" handleClick={() => {}}>Apply</PrimaryButton>
              </div>
            </div>

            <div className="lg:pl-8 w-full lg:w-9/12 ">
              <div className="flex flex-wrap items-center space-y-1 lg:space-y-0">
                <div className="w-full lg:w-2/3">
                  {searchQuery ?
                  <div className="bg-gray-2 dark:bg-gray-8 border-2 border-gray-5 inline-block rounded py-1 px-2">
                      <p className="text-xs flex items-center">
                          {searchQuery} 
                          <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => setSearchQuery("")} />
                      </p>
                  </div>
                  :
                  <></>
                  }
                </div>
                <div className="w-full lg:w-1/3">
                  <SearchInput setSearchQuery={setSearchQuery} />
                </div>
              </div>
            </div>

          </div>
        <UserListTable data={data} />
      </ListLayout>
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})

const SearchInput = ({setSearchQuery}) => {

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.search.value)
  }
  
  return (
    <form onSubmit={handleSearchSubmit}>
      <label aria-label="search users" htmlFor="search" className="hidden">Search users</label>
      <div className="flex relative w-full">
        <SearchOutlined className="absolute left-2 transform py-1 -translate-y-0.5 text-gray-8 cursor-pointer text-lg"/>
        <input
          id="search"
          name="search"
          type="text"
          className="px-2 py-1 w-full border-gray-5 pl-8 border rounded"
          placeholder="Search users..."
        />
      </div>  
    </form>
  )
}
