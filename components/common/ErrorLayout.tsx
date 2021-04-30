import Layout from "components/common/Layout"
import Head from 'next/head'
import { Alert } from 'antd';
import 'antd/lib/alert/style/index.css';

const ErrorLayout = () => {
    return (
        <Layout>
            <Head>
            <title>500 Passport</title>
            </Head>
            <div className="mt-4">
                <Alert type="error" message="An error has occured" banner />
            </div>
      </Layout>
        
    )
}

export default ErrorLayout