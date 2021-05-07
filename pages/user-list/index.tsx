import {useEffect} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import ListLayout from 'components/roles-and-permissions/ListLayout'
import UserListTable from 'components/roles-and-permissions/UserListTable'
import {useHeaderTitle} from 'store/useHeaderTitle'

export default function UserList() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: User List`)
  }, [])

  return (
    <RoleLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ListLayout title="User List" buttonText="Add User" initialTab="500 Applications">
        <UserListTable />
      </ListLayout>
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})