import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, List, Pagination } from 'antd';
import { useNews, useReloadNews } from 'store';
import { NewsListItem } from './item';
import { diffDays } from 'utility/utils';

export interface NewsListProps {
    limit?: number
    pageSize?: number
    postAgeLimit?: number
    title?: string
}



export const NewsList: React.FC<NewsListProps> = (props) =>{
    const { limit, pageSize, postAgeLimit } = props
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(pageSize || 10)
    const reloadNews = useReloadNews()
    const news = useNews()

    const fixedSize = useMemo(() => {
        return !!(limit || postAgeLimit)
    }, [limit, postAgeLimit])

    const newsSorted = useMemo(() => {
        return news.sort((i1, i2)=> (new Date(i1.published_at) < (new Date(i2.published_at)) ? 1 : -1))
    }, [news])

    const mediaSized = useMemo(() => {
        if (limit) {
            return  newsSorted.slice(0, limit)
        } else if (postAgeLimit) {
            
            return newsSorted.filter(i =>{
                const age = diffDays(new Date(i.published_at), new Date())
                return age < postAgeLimit
            })
        }
        return newsSorted.slice((page - 1) * size, size * page)

        // TODO: Sort media
    }, [page, size, newsSorted, limit, postAgeLimit])

    const onPageChange = useCallback((newpage: number, newsize: number) => {
        setPage(newpage)
        setSize(newsize)
    }, [])

    useEffect(() => {
        reloadNews()
    }, [reloadNews])

    return (
        <>
            <Divider style={{ textTransform: 'capitalize' }} orientation="left">{props.title||"News"}</Divider>
            <List
            header={!fixedSize ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={mediaSized.length} /> : <></>}
            footer={!fixedSize ? <Pagination showSizeChanger current={page} pageSize={size} responsive onChange={onPageChange} total={mediaSized.length} /> : <></>}
            bordered
            dataSource={mediaSized}
            renderItem={(item) => <NewsListItem key={`list_${item.id}`} item={item} />}
            />
        </>
)};

