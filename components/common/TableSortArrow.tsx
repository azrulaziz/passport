import {UpOutlined, DownOutlined} from '@ant-design/icons'

const TableSortArrow = () => {
    return (
        <div className="text-xs mx-2" style={{fontSize: "0.4rem"}}>
            <UpOutlined className="block"/>
            <DownOutlined className="block"/>
        </div>
    )
}

export default TableSortArrow