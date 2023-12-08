import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, List, Pagination } from 'antd';
import { MEDIA_SECTIONS, useMediaBySection, useReloadMedia } from 'store';
import { MediaListItem } from './item';
import { diffDays } from 'utility/utils';

export interface MediaListProps {
    section: MEDIA_SECTIONS
    limit?: number
    pageSize?: number
    postAgeLimit?: number
    title?: string
}



export const MediaList: React.FC<MediaListProps> = (props) =>{
    const { limit, pageSize, postAgeLimit } = props
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(pageSize || 10)
    const media = useMediaBySection(props.section)
    const reloadMedia = useReloadMedia()

    const fixedSize = useMemo(() => {
        return !!(limit || postAgeLimit)
    }, [limit, postAgeLimit])

    const mediaSorted = useMemo(() => {
        return media.sort((i1, i2)=> (new Date(i1.created_at) < (new Date(i2.created_at)) ? 1 : -1))
    }, [media])

    const mediaSized = useMemo(() => {
        if (limit) {
            return  mediaSorted.slice(0, limit)
        } else if (postAgeLimit) {
            
            return mediaSorted.filter(i =>{
                const age = diffDays(new Date(i.created_at), new Date())
                return age < postAgeLimit
            })
        }
        return mediaSorted.slice((page - 1) * size, size * page)

        // TODO: Sort media
    }, [page, size, mediaSorted, limit, postAgeLimit])

    const onPageChange = useCallback((newpage: number, newsize: number) => {
        setPage(newpage)
        setSize(newsize)
    }, [])

    useEffect(() => {
        reloadMedia()
    }, [reloadMedia])

    return (
        <>
            <Divider style={{ textTransform: 'capitalize' }} orientation="left">{props.title||props.section}</Divider>
            <List
            header={!fixedSize ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={media.length} /> : <></>}
            footer={!fixedSize ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={media.length} /> : <></>}
            bordered
            dataSource={mediaSized}
            renderItem={(item) => <MediaListItem key={`list_${item.section}_${item.id}`} item={item} />}
            />
        </>
)};

