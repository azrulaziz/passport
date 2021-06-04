import {useEffect, useState} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import ListLayout from 'components/roles-and-permissions/ListLayout'
import UserGroupsTable from 'components/roles-and-permissions/UserGroupsTable'
import {useHeaderTitle} from 'store/useHeaderTitle'
import CreateGroupModal from 'components/roles-and-permissions/CreateGroupModal'
import {PrimaryButton, } from 'design-systems'

export default function UserGroups() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: User Groups`)
  }, [])
  
  return (
    <RoleLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <CreateGroupModal isOpen={isOpen} onRequestClose={handleCloseModal} />
      <ListLayout title="Manage Groups" buttonFunction={() => handleOpenModal()} buttonText="Create a new group" initialTab="500 Applications">
        <UserGroupsTable />
      </ListLayout>
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})