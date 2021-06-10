import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import ProfileLayout from 'components/profile/ProfileLayout'
import PersonalInfoForm from 'components/profile/PersonalInfoForm'
import { useRouter } from 'next/router'
import {useQuery, useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {endpoint} from 'config'

const GET_PERSONAL_INFO = gql`
  query  {
    User (id: 1) {
      id
      firstName
      lastName
      suffix
      preferredName
      gender
      otherPronouns
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
    const data = await request(endpoint, GET_PERSONAL_INFO);
    return data;
  }

  const { data, status } = useQuery('personalInfoForm', fetchPersonalInfo);
  const queryClient = useQueryClient()
  const { mutate } = useMutation((values) =>
      request(endpoint, UPDATE_PERSONAL_INFO, values), {
      onError: (error) => {
        console.log(error)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries('personalInfoForm')
        queryClient.invalidateQueries('profile')
        router.push('/profile')
      }
    }
  );
  
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


  const handleSaveChanges = (data) => {
    mutate(data)
  }

  return (
    <Layout>
      <Head>
        <title>{t('head-title')}</title>
      </Head>
      <ProfileLayout 
        personalInfo={<PersonalInfoForm data={data} saveChanges={handleSaveChanges} />} 
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

const UPDATE_PERSONAL_INFO = gql`
  mutation UPDATE_PERSONAL_INFO(
        $id: ID!, 
        $firstName: String!, 
        $lastName: String!, 
        $gender: String!,
        $otherPronouns: String!,
        $headline: String!, 
        $linkedinUrl: String!
    )  {
    updateUser(
        id: $id, 
        firstName: $firstName, 
        lastName: $lastName, 
        gender: $gender,
        otherPronouns: $otherPronouns
        headline: $headline, 
        linkedinUrl: $linkedinUrl
    ) {
        id
        firstName
        lastName
        gender
        otherPronouns
        linkedinUrl
        headline
        preferredName
    }
  }
`;