import {useEffect} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import {useHeaderTitle} from 'store/useHeaderTitle'
import CreateRole from 'components/roles-and-permissions/CreateRole'

export default function RolesPermissions() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: Create a new role`)
  }, [])

  const moduleSections = ['dashboard', 'open programs', 'referral management', 'admin & manager settings']
  
  return (
    <RoleLayout>
        <Head>
            <title>{t('head-title')}</title>
        </Head>
        <CreateRole moduleSections={moduleSections} />
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})