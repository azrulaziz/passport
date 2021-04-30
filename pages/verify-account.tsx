import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import AccessLayout from "components/access/AccessLayout"
import VerifyCode from "components/access/VerifyCode"
import { useTranslation } from 'next-i18next'

export default function VerifyAccount() {
  const { t } = useTranslation('verify-account')
  
  return (
    <AccessLayout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>

      <VerifyCode />
    </AccessLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'verify-account']),
  }
})