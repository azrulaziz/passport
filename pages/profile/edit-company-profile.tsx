import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import CompanyProfileForm from 'components/profile/CompanyProfileForm'

export default function EditCompanyProfile() {
  const { t } = useTranslation('profile')
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <CompanyProfileForm />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})