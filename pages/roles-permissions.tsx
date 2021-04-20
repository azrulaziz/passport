import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'

export default function RolesPermissions() {
  const { t } = useTranslation('profile')

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <p className="">roles</p>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})