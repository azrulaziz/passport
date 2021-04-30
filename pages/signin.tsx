import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import AccessLayout from "components/access/AccessLayout"
import SignIn from 'components/access/SignIn'
import { useTranslation } from 'next-i18next'

export default function Signin() {
  const { t } = useTranslation('signin')

  return (
    <AccessLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <SignIn />
    </AccessLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'signin']),
  }
})