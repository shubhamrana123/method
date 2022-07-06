import React ,{Fragment}from 'react'
import { Card, List } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const IDModule = (props)=>
{
    return(
        <Fragment>
            <Card title={props.title} style={{ flexWrap: 'wrap' }} loading={isLoading}>
                <List dataSource={data?.didDocument?.verificationMethod || data?.didDocument?.publicKey}
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
        </Fragment>
    )
}
export default IDModule;