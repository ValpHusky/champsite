import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, List } from 'antd';
import { MEDIA_SECTIONS, useMediaBySection, useReloadMedia } from 'store';
import { MediaListItem } from './item';
import { diffDays } from 'utility/utils';
import { HelpTools } from 'components/helptools';

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
    const [sortKey, setSortKey] = useState("1")
    const media = useMediaBySection(props.section)
    const reloadMedia = useReloadMedia()

    const fixedSize = useMemo(() => {
        return !!(limit || postAgeLimit)
    }, [limit, postAgeLimit])

    const mediaSorted = useMemo(() => {
        if (sortKey === '1') {
            return media.sort((i1, i2)=> i1.title > i2.title ? 1 : -1)
        } else if (sortKey === '2') {
            return media.sort((i1, i2)=> i1.title < i2.title ? 1 : -1)
        } else if (sortKey === '3') {
            return media.sort((i1, i2)=> (new Date(i1.published_at) < (new Date(i2.published_at)) ? 1 : -1))
        }
        return media
        
    }, [media])

    const mediaSized = useMemo(() => {
        if (limit) {
            return  mediaSorted.slice(0, limit)
        } else if (postAgeLimit) {
            
            return mediaSorted.filter(i =>{
                const age = diffDays(new Date(i.published_at), new Date())
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

    const onSortClick = useCallback((e: any) => {
        setSortKey(e.key)
    }, [])

    useEffect(() => {
        reloadMedia()
    }, [reloadMedia])

    return (
        <>
            <Divider style={{ textTransform: 'capitalize' }} orientation="left">{props.title||props.section}</Divider>
            <List
            header={<HelpTools onSortClick={onSortClick} sortKey={sortKey} fixedSize={fixedSize} page={page} size={size} onPageChange={onPageChange} length={mediaSized.length} />}
            footer={<HelpTools onSortClick={onSortClick} sortKey={sortKey} fixedSize={fixedSize} page={page} size={size} onPageChange={onPageChange} length={mediaSized.length} />}
            bordered
            dataSource={mediaSized}
            renderItem={(item) => <MediaListItem key={`list_${item.section}_${item.id}`} item={item} />}
            />
        </>
)};

