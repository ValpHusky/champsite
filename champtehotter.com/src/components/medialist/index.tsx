import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, List, Pagination } from 'antd';
import { MEDIA_SECTIONS, useMediaBySection, useReloadMedia } from 'store';
import { MediaListItem } from './item';

export interface MediaListProps {
    section: MEDIA_SECTIONS
    limit?: number
}



export const MediaList: React.FC<MediaListProps> = (props) =>{
    const { limit } = props
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(1)
    const media = useMediaBySection(props.section)
    const reloadMedia = useReloadMedia()

    const mediaSized = useMemo(() => {
        return limit ? media.slice(0, limit) : media.slice((page - 1) * size, size * page)

        // TODO: Sort media
    }, [page, size, media, limit])

    const onPageChange = useCallback((newpage: number, newsize: number) => {
        setPage(newpage)
        setSize(newsize)
    }, [])

    useEffect(() => {
        reloadMedia()
    }, [reloadMedia])

    return (
        <>
            <Divider style={{ textTransform: 'capitalize' }} orientation="left">{props.section}</Divider>
            <List
            header={!props.limit ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={media.length} /> : <></>}
            footer={!props.limit ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={media.length} /> : <></>}
            bordered
            dataSource={mediaSized}
            renderItem={(item) => <MediaListItem key={`list_${item.section}_${item.id}`} item={item} />}
            />
        </>
)};

