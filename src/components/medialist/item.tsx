import { DeleteOutlined, DownloadOutlined, FileImageOutlined, FileOutlined, FilePdfOutlined, FileTextOutlined, FileZipOutlined, SoundOutlined } from "@ant-design/icons"
import { Authenticated } from "@refinedev/core"
import { Button, Col, Flex, List, Row, Typography } from "antd"
import { CONFIG_NEW_TAGDELTADAYS } from "configs"
import { useCallback, useMemo } from "react"
import { ChampMedia, useReloadMedia } from "store"
import { serviceDeleteMedia, serviceDownloadMedia } from "utility/services"
import { diffDays } from "utility/utils"

export interface MediaListItemProps {
    item: ChampMedia
}



export const getMediaListMimeIcon = (mime: string) => {
    if (mime.indexOf('image') !== -1) {
        return <FileImageOutlined />
    } else if(mime.indexOf('pdf') !== -1) {
        return <FilePdfOutlined />
    } else if(mime.indexOf('text') !== -1) {
        return <FileTextOutlined />
    } else if(mime.indexOf('zip') !== -1) {
        return <FileZipOutlined />
    } else if(mime.indexOf('audio') !== -1) {
        return <SoundOutlined />
    } else {
        return <FileOutlined />
    }
}

export const MediaListItem: React.FC<MediaListItemProps> = (props) => {

    const { item } = props
    const reloadMedia = useReloadMedia()
    
    const date = useMemo(() => (new Date(item.published_at)).toLocaleDateString('en-US'), [item.published_at])
    const isnew = useMemo(() => diffDays(new Date(item.published_at), new Date()) < CONFIG_NEW_TAGDELTADAYS, [item])


    const deleteMedia = useCallback((item: ChampMedia) => async () => {
        await serviceDeleteMedia(item)
        reloadMedia()
    }, [reloadMedia])

    return(
        <List.Item>
            <Row style={{ flex: 1 }}>
                <Col
                    xs={{ span: 18 }} 
                    sm={{ span: 16 }} 
                    md={{ span: 16 }} 
                >
                    <Flex align="center">
                        {isnew &&
                            <>  
                                 <Typography.Text type="danger" style={{ fontWeight: 'bolder', fontSize: 11 }}>[new]</Typography.Text>
                                &nbsp;
                            </>
                        }
                        {getMediaListMimeIcon(item.mime)}
                        <Typography.Text ellipsis style={{ fontWeight: 'bold' }}>
                            {item.title}
                        </Typography.Text>
                    </Flex>
                    {item.description &&
                        <Typography.Text style={{ fontSize: 14 }}>
                            {item.description}
                        </Typography.Text>
                    }
                </Col>
                <Col
                    xs={{ span: 6 }} 
                    sm={{ span: 4 }} 
                    md={{ span: 4 }}
                    style={{ textAlign:'right' }}
                >
                    <Typography.Text type="secondary" style={{ fontSize: 14 }}>{date}</Typography.Text>
                </Col>
                <Col
                    xs={{ span: 24 }} 
                    sm={{ span: 4 }} 
                    md={{ span: 4 }}
                    style={{ textAlign:'right', fontSize: 18 }}
                >
                    <Button type="text" onClick={() => serviceDownloadMedia(item.url)} icon={<DownloadOutlined />}></Button>
                    <Authenticated fallback={<></>}>
                        <Button type="text" color="danger" onClick={deleteMedia(item)} icon={<DeleteOutlined />}></Button>
                    </Authenticated>
                </Col>
            </Row>
            
        </List.Item>
    )
}