import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Layout from "components/common/Layout"
import { useTranslation } from 'next-i18next'
import AccountSettings from 'components/account/AccountSettings'
import {useHeaderTitle} from 'store/useHeaderTitle'
import { useEffect } from 'react'

export default function Account() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)
  useEffect(() => {
      setHeaderTitle(`Account Settings`)
  })

  return (
    <Layout>
      <Head>
        <title>Account Settings</title>
      </Head>
      <AccountSettings />
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})