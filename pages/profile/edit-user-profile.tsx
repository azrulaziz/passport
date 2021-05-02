import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import UserProfileForm from 'components/profile/UserProfileForm'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'
import {endpoint} from 'config'

const GET_USER_PROFILE = gql`
  query  {
    User (id: 1) {
      id
      UserProfiles {
        id
        summary
        skills
        tools
        interest
        user_id
      }
    }
  }
`;


export default function EditUserProfile() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  setHeaderTitle(`Edit User Profile`)

  const fetchUserProfile = async () => {
    const data = await request(endpoint, GET_USER_PROFILE);
    return data;
  }

  const { data, status } = useQuery('userProfile', fetchUserProfile);

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
      <UserProfileForm profileData={data?.User?.UserProfiles} />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})