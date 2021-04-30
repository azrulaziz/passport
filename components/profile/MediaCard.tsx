import {DeleteOutlined} from '@ant-design/icons'

interface Props {
    link: any
    handleRemoveLink: (each: string) => void
}

const MediaCard: React.FC<Props> = ({link, handleRemoveLink}) => {
    return (
        <div className="border border-gray-5 ">
            <div className="bg-gray-9 h-32 w-full">

            </div>
            <div className="p-2 flex justify-between items-start">
                <div>
                    <h1 className="text-sm text-gray-9 mb-1">Article Title</h1>
                    <p className="text-gray-7 text-xs">{link}</p>
                </div>
                <div>
                    <DeleteOutlined className="text-gray-6" onClick={() => handleRemoveLink(link)} />
                </div>
            </div>
        </div>
    )
}

export default MediaCard