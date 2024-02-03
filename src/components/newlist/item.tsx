import { DeleteOutlined } from "@ant-design/icons"
import { Authenticated } from "@refinedev/core"
import { Button, Col, List, Row, Typography } from "antd"
import { CONFIG_NEW_TAGDELTADAYS } from "configs"
import { useCallback, useMemo } from "react"
import { ChampNews, useReloadNews } from "store"
import { serviceDeleteNews } from "utility/services"
import { diffDays } from "utility/utils"

export interface NewsListItemProps {
    item: ChampNews
}



export const NewsListItem: React.FC<NewsListItemProps> = (props) => {

    const { item } = props
    const reloadNews = useReloadNews()
    
    const date = useMemo(() => (new Date(item.published_at)).toLocaleDateString('en-US'), [item.published_at])
    const isnew = useMemo(() => diffDays(new Date(item.published_at), new Date()) < CONFIG_NEW_TAGDELTADAYS, [item])


    const deleteNews = useCallback((item: ChampNews) => async () => {
        await serviceDeleteNews(item)
        reloadNews()
    }, [reloadNews])

    return(
        <List.Item>
            <Row style={{ flex: 1 }}>
                <Col
                    xs={{ span: 18 }} 
                    sm={{ span: 20 }} 
                >
                    {/* <Flex align="center"> */}
                        {isnew &&
                            <>  
                                 <Typography.Text type="danger" style={{ fontWeight: 'bolder', fontSize: 11 }}>[new]</Typography.Text>
                                &nbsp;
                            </>
                        }
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>{date}&nbsp;&nbsp;</Typography.Text>
                        {item.content &&
                        <Typography.Text style={{ fontSize: 14 }}>
                            {item.content}
                        </Typography.Text>
                    }
                    {/* </Flex> */}
                </Col>
                <Col
                    xs={{ span: 4 }}
                    md={{ span: 2 }}  
                    style={{ textAlign:'right', fontSize: 18 }}
                >
                    <Authenticated fallback={<></>}>
                        <Button type="text" color="danger" onClick={deleteNews(item)} icon={<DeleteOutlined />}></Button>
                    </Authenticated>
                </Col>
            </Row>
            
        </List.Item>
    )
}