import React, { useState } from 'react'
import { Card, List } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'



const Module = ({
  title,
  identifier,
  cacheKey,
}) => {

    const [isLoading,setIsLoading] = useState(false);
    const [data,setData] = useState(null);
  return (
    <Card title={title} style={{ flexWrap: 'wrap' }} loading={isLoading}>
      <List
        dataSource={
          data?.didDocument?.verificationMethod || data?.didDocument?.publicKey
        }
        renderItem={(item, i) => {
          return (
            <List.Item key={i}>
              <List.Item.Meta
                avatar={<LockOutlined />}
                title={
                  <Link to={'/identifiers/' + item.controller}>
                    <code>{item.controller}</code>
                  </Link>
                }
                description={item.type}
              />
            </List.Item>
          )
        }}
      ></List>
    </Card>
  )
}

export default Module
