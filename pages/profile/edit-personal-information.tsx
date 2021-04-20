import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoForm from 'components/profile/PersonalInfoForm'
import { useRouter } from 'next/router'

export default function EditPersonalInfo() {
  const { t } = useTranslation('profile')
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ProfileLayout 
        main={<PersonalInfoForm />} 
        side={<></>}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})