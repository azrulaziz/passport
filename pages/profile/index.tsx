import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoPanel from 'components/profile/PersonalInfoPanel'
import AddProfilePanel from 'components/profile/AddProfilePanel'

export default function Profile() {
  const { t } = useTranslation('profile')

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ProfileLayout 
        main={<PersonalInfoPanel/>} 
        side={
        <div className="lg:mt-10">
          <AddProfilePanel />
        </div>}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})