import Layout from "components/common/Layout"
import ProfileLayout from 'components/profile/ProfileLayout'
import Head from 'next/head'
import { Skeleton } from 'antd';
import 'antd/lib/skeleton/style/index.css';

const LoadingLayout = () => {
    return (
    <Layout>
        <Head>
          <title>500 Passport</title>
        </Head>
        <ProfileLayout
            personalInfo={<Skeleton active />}
            main={<Skeleton active />} 
            side={<Skeleton active />}
        />
            
      </Layout>
    )
}

export default LoadingLayout