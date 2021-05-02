import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import MentorProfileForm from 'components/profile/MentorProfileForm'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'
import {endpoint} from 'config'

const GET_MENTOR_PROFILE = gql`
  query  {
    User (id: 1) {
      id
      MentorProfiles {
        id
        summary
        region
        remote
        familiarSector
        mentoringSector
        user_id
      }
    }
  }
`;


export default function EditMentorProfile() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  setHeaderTitle(`Edit Mentor Profile`)

  const fetchMentorProfile = async () => {
    const data = await request(endpoint, GET_MENTOR_PROFILE);
    return data;
  }

  const { data, status } = useQuery('profile', fetchMentorProfile);

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
      <MentorProfileForm profileData={data?.User?.MentorProfiles}  />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})