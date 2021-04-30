import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoPanel from 'components/profile/PersonalInfoPanel'
import AddProfilePanel from 'components/profile/AddProfilePanel'
import {useQuery, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import MentorProfile from 'components/profile/MentorProfile'
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'
import {useHeaderTitle} from 'store/useHeaderTitle'
import { useEffect } from 'react'

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
        languages
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


export default function MentorProfilePage() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  

  const fetchProfile = async () => {
    const data = await request("http://localhost:4000/graphql/", GET_PROFILE_DATA);
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
        personalInfo={<PersonalInfoPanel data={data} />}
        main={<MentorProfile profile={data?.User?.MentorProfiles} />} 
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