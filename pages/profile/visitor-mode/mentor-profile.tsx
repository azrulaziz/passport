import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoPanel from 'components/profile/PersonalInfoPanel'
import {useQuery} from "react-query";
import { request } from "graphql-request";
import MentorProfile from 'components/profile/MentorProfile'
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'
import { useEffect } from 'react'
import {endpoint} from 'config'
import {GET_PROFILE_DATA} from './index'
import VisitorModeSidePanel from 'components/profile/VisitorModeSidePanel'

export default function MentorProfilePage() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  const fetchProfile = async () => {
    const data = await request(endpoint, GET_PROFILE_DATA);
    return data;
  }

  const { data, status } = useQuery('profile', fetchProfile);

  useEffect(() => {
    setHeaderTitle(`Profile: ${data?.User?.firstName} ${data?.User?.lastName}`)
  }, [data])

  if (status === 'loading') {
    return (
      <LoadingLayout />
    )
  }

  if (status === 'error') {
    return (
      <ErrorLayout />
    )
  }

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ProfileLayout 
        personalInfo={<PersonalInfoPanel data={data} visitorMode={true} />}
        main={<MentorProfile profile={data?.User?.MentorProfiles} visitorMode={true} />} 
        side={<VisitorModeSidePanel link="/profile/mentor-profile" />}
      />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})