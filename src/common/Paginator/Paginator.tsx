import React, { FC } from 'react'
import s from './Paginator.module.css'
import { Pagination, PaginationProps } from 'antd'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChange: (newPage: number) => void
}

export const Paginator: FC<PropsType> = ({ totalItemsCount, pageSize, onPageChange, currentPage }) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'jump-next' || type === 'jump-prev') {
      return <span>...</span>
    }
    return originalElement
  }

  return (
    <Pagination
      className={s.paginator}
      current={currentPage}
      total={totalItemsCount}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
      itemRender={itemRender}
    />
  )
}
