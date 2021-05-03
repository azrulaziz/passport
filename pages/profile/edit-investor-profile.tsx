import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import InvestorProfileForm from 'components/profile/InvestorProfileForm'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";
import {useHeaderTitle} from 'store/useHeaderTitle'
import {endpoint} from 'config'
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'

const GET_INVESTOR_PROFILE = gql`
  query  {
    User (id: 1) {
      id
      InvestorProfiles {
        id
        title
        role
        minInvestment
        sweetSpot
        maxInvestment
        sectorsOfInterest
        investmentHistory
        investmentStage
        countriesOfInvestment
        leadInvestor
        investingAttributes
        education
        experience
        mediaLink
      }
    }
  }
`;

export default function EditInvestorProfile() {
  const { t } = useTranslation('profile')

  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  setHeaderTitle(`Edit Investor Profile`)

  const fetchInvestorProfile = async () => {
    const data = await request(endpoint, GET_INVESTOR_PROFILE);
    return data;
  }

  const { data, status } = useQuery('investorProfile', fetchInvestorProfile);

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
      <InvestorProfileForm profileData={data?.User?.InvestorProfiles} />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})