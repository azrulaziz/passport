import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import CompanyProfileForm from 'components/profile/CompanyProfileForm'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";
import {useHeaderTitle} from 'store/useHeaderTitle'
import {endpoint} from 'config'
import ErrorLayout from 'components/common/ErrorLayout'
import LoadingLayout from 'components/common/LoadingLayout'


const GET_COMPANY_PROFILE = gql`
  query  {
    User (id: 1) {
      id
      CompanyProfiles {
        id
        companyName
        linkedinProfile
        companyLogo
        companyFounded
        companyWebsite
        sectors
        stage
        businessModel
        describeCompany
        describeBusinessModel
        marketChannel
        useCase
        whyRightTiming
        foundingMember
        outsideFunding
        fundraisingTarget
        optionalLink
        companyLocation
        incorporatedLocation
      }
    }
  }
`;

export default function EditCompanyProfile() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  setHeaderTitle(`Edit Company Profile`)

  const fetchCompanyProfile = async () => {
    const data = await request(endpoint, GET_COMPANY_PROFILE);
    return data;
  }

  const { data, status } = useQuery('companyProfile', fetchCompanyProfile);

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
      <CompanyProfileForm profileData={data?.User?.CompanyProfiles} />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})