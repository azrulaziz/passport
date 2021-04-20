import Head from 'next/head'
import AccessLayout from "components/user/AccessLayout"
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const user = null

  useEffect(() => {
    if (!user) router.push('/signin')

  }, [])

  return (
    <AccessLayout>
      <Head>
        <title>500 Passport</title>
      </Head>

      <p className="text-sm italic">test</p>
    </AccessLayout>
  )
}