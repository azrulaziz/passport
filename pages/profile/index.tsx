import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoPanel from 'components/profile/PersonalInfoPanel'
import AddProfilePanel from 'components/profile/AddProfilePanel'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";
import UserProfile from 'components/profile/UserProfile'
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'
import {useEffect} from 'react'
import {endpoint} from 'config'

const GET_PROFILE_DATA = gql`
  query  {
    User (id: 1) {
      id
      email
      firstName
      lastName
      suffix
      preferredName
      gender
      headline
      linkedinUrl
      photo
      UserProfiles {
        summary
        skills
        tools
        interest
      }
      CompanyProfiles {
        id
      }
      MentorProfiles {
        summary
        region
        remote
        familiarSector
        mentoringSector
      }
      InvestorProfiles {
        id
      }
    }
  }
`;


export default function Profile() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  

  
  const fetchProfile = async () => {
    const data = await request(endpoint, GET_PROFILE_DATA);
    return data;
  }
  const { data, status } = useQuery('profile', fetchProfile);
  console.log(endpoint)
  
  useEffect(() => {
    setHeaderTitle(`Profile: ${data?.User?.firstName ? data?.User?.firstName : ""} ${data?.User?.lastName ? data?.User?.lastName : ""}`)
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
        personalInfo={<PersonalInfoPanel data={data} />}
        main={<UserProfile profile={data?.User?.UserProfiles} />} 
        side={
        <div className="lg:mt-10">
          <AddProfilePanel data={data} />
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