import {useEffect} from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import RoleLayout from "components/roles-and-permissions/RoleLayout"
import { useTranslation } from 'next-i18next'
import {useHeaderTitle} from 'store/useHeaderTitle'
import CreateRole from 'components/roles-and-permissions/CreateRole'

export default function RolesPermissions() {
  const { t } = useTranslation('profile')
  const setHeaderTitle = useHeaderTitle(state => state.setTitle)

  useEffect(() => {
    setHeaderTitle(`Roles & Permissions: Create a new role`)
  }, [])

  const moduleSections = ['dashboard', 'open programs', 'referral management', 'admin & manager settings']
  
  return (
    <RoleLayout>
        <Head>
            <title>{t('head-title')}</title>
        </Head>
        <CreateRole moduleData={mockData} />
    </RoleLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'profile']),
  }
})

// ! “Read” permission is automatically granted if “Modify” or “Write” permissions are granted. 
const mockData = [
  {
      module: 'dashboard',
      sections: [
          {
              name: 'program applications',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: true,
                      write: true,
                  },
              ]
          },
          {
              name: 'managed applications',
              visibility: false,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
          {
              name: 'applications to evaluate',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
      ]
  },
  {
      module: 'open programs',
      sections: [
          {
              name: 'view programs',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: true,
                      write: true,
                  },
              ]
          },
          {
              name: 'managed programs',
              visibility: false,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
          {
              name: 'applications to evaluate',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
      ]
  },
  {
      module: 'referral management',
      sections: [
          {
              name: 'program applications',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: true,
                      write: true,
                  },
              ]
          },
          {
              name: 'managed applications',
              visibility: false,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view applicatio progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
          {
              name: 'applications to evaluate',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
      ]
  },
  {
      module: 'admin & manager settings',
      sections: [
          {
              name: 'program applications',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: true,
                      write: true,
                  },
              ]
          },
          {
              name: 'managed applications',
              visibility: false,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
          {
              name: 'applications to evaluate',
              visibility: true,
              allReadAccess: true,
              allModifyAccess: false,
              allWriteAccess: false,
              permissionList: [
                  {
                      type: "view dashboard",
                      read: true,
                      modify: false,
                      write: false,
                  },
                  {
                      type: "start an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "submit an application",
                      read: true,
                      modify: false,
                      write: true,
                  },
                  {
                      type: "view application progress",
                      read: true,
                      modify: false,
                      write: true,
                  },
              ]
          },
      ]
  }
]