import Head from 'next/head'
import AccessLayout from "components/access/AccessLayout"
import SignUp from 'components/access/SignUp'
import SelectLanguage from "components/common/SelectLanguange"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function CreateAccount() {
  const { t } = useTranslation('signup')

  return (
    <AccessLayout>
        <Head>
            <title>{t('head-title')}</title>
        </Head>
        <SignUp />
        <SelectLanguage />
    </AccessLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'signup']),
  }
})