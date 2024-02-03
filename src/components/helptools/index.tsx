import { CalendarOutlined, DownOutlined, FontColorsOutlined } from "@ant-design/icons"
import { Button, Dropdown, Pagination, Space } from "antd"
import { MenuProps } from "antd/lib"

export interface HelpToolsProps {
    fixedSize: boolean
    page: number
    size: number
    length: number
    sortKey: string
    onPageChange: (newpage: number, newsize: number) => void
    onSortClick: MenuProps['onClick']
}

const items = [
    {
      label: 'Sort alphabetically',
      key: '1',
      icon: <FontColorsOutlined />,
    },
    {
      label: 'Sort by date',
      key: '2',
      icon: <CalendarOutlined />,
    }
];




export const HelpTools =  (props: HelpToolsProps & React.PropsWithChildren)  => {

    return (
        <>
            {!props.fixedSize ? <Pagination showSizeChanger current={props.page} pageSize={props.size} responsive onChange={props.onPageChange} total={props.length} /> : <></>}
            <Dropdown menu={{ onClick: props.onSortClick, items }}>
                <Button>
                    <Space>
                    {items.find((i => i?.key === props.sortKey))?.label}
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </>
    )
}