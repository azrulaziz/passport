import { useRouter } from 'next/router'
import { DarkTransparentButton } from 'components/common/Button'

type Props = {
    link: string
}

const VisitorModeSidePanel: React.FC<Props> = ({link}) => {
    const router = useRouter()

    return (
        <div className="flex justify-end">
            <DarkTransparentButton type="button" onClick={() => router.push(link)}>
            Exit Visitor Mode
            </DarkTransparentButton>
        </div>
    )
}

export default VisitorModeSidePanel