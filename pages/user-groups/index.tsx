import {useEffect} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import ListLayout from 'components/roles-and-permissions/ListLayout'
import UserGroupsTable from 'components/roles-and-permissions/UserGroupsTable'
import {useHeaderTitle} from 'store/useHeaderTitle'

export default function UserGroups() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: User Groups`)
  }, [])

  return (
    <RoleLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ListLayout title="Manage Groups" buttonText="Create a new group" initialTab="500 Applications">
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