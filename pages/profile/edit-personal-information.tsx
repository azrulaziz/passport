import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoForm from 'components/profile/PersonalInfoForm'
import { useRouter } from 'next/router'
import {useQuery} from "react-query";
import { request, gql } from "graphql-request";

const GET_PERSONAL_INFO = gql`
  query  {
    User (id: 1) {
      id
      firstName
      lastName
      suffix
      preferredName
      gender
      headline
      linkedinUrl
      photo
    }
  }
`;

export default function EditPersonalInfo() {
  const { t } = useTranslation('profile')
  const router = useRouter()

  const fetchPersonalInfo = async () => {
    const data = await request("http://localhost:4000/graphql/", GET_PERSONAL_INFO);
    return data;
  }
  const { data, status } = useQuery('personalInfoForm', fetchPersonalInfo);
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
      <ProfileLayout 
        personalInfo={<PersonalInfoForm data={data} />} 
        main={<></>}
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