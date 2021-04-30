import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import SignIn from 'components/access/SignIn'
import { useTranslation } from 'next-i18next'

export default function Profile() {
  const { t } = useTranslation('profile')

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <div className="h-screen py-20">
        test
      </div>
      <div className="text-black">
          test
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})