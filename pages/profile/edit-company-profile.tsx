import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import CompanyProfileForm from 'components/profile/CompanyProfileForm'
import {useQuery, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useHeaderTitle} from 'store/useHeaderTitle'
import {endpoint} from 'config'

const GET_FORM_DATA = gql`
  query  {
    allSectorsOptions {
      value
    }
    allStageOptions {
      value
    }
  }
`;

export default function EditCompanyProfile() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  setHeaderTitle(`Edit Company Profile`)

  const fetchEditCompanyProfileData = async () => {
    const data = await request(endpoint, GET_FORM_DATA);
    return data;
  }

  const { data, status } = useQuery('editCompanyProfileData', fetchEditCompanyProfileData);

  if (status === 'loading') {
    return (
      <Layout>
        <Head>
          <title>{t('head-title')}</title>
        </Head>
        <></>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <CompanyProfileForm data={data} />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})