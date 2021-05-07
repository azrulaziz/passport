import {useEffect} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import RolesAndPermissionsTable from "components/roles-and-permissions/RolesAndPermissionsTable"
import { useTranslation } from 'next-i18next'
import ListLayout from 'components/roles-and-permissions/ListLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'

export default function RolesPermissions() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: Overview`)
  }, [])
  
  return (
    <RoleLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      
      <ListLayout title="Roles & Permissions" buttonText="Create a new role" initialTab="500 Applications">
        <RolesAndPermissionsTable />
      </ListLayout>
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})