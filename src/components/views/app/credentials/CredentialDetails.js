import React,{Fragment, useState} from 'react'
import { Typography, Card, Layout, Tag, Row, Col, Table, List } from 'antd'
import { format } from 'date-fns'
import { useParams, useHistory } from 'react-router-dom'
import { BlockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom';
import JsonBlock from '../../../../utils/JsonBlock';
import IDModule from '../../../../utils/IDModule';

const CredentialDetails = ()=>
{
    const navigate = useNavigate();
    const { Title } = Typography
    const { id } = useParams();
    const [credential,setCredential] = useState([]);
    const [credentialLoading,setCredentialLoading] = useState(false);
    const onBackHandler = ()=>
    {

    }
    
    const rightContent = () => {
        return (
          <Layout>
            <Card title="Context">
              <List
                dataSource={credential?.['@context']}
                renderItem={(item, i) => {
                  return (
                    <List.Item key={i}>
                      <List.Item.Meta
                        avatar={<BlockOutlined />}
                        title={
                          <Link to={item}>
                            <code>{item}</code>
                          </Link>
                        }
                        description={item.type}
                      />
                    </List.Item>
                  )
                }}
              ></List>
            </Card>
            <IDModule
              cacheKey="issuer"
              title="Issuer"
              identifier={credential?.issuer.id}
            />
            <IDModule
              cacheKey="subject"
              title="Subject"
              identifier={credential?.credentialSubject.id}
            />
          </Layout>
        )
      }
    
    return(
        <Fragment>
            <div className="row">
                <div className='col-md-1'></div>
                <div className='col-md-8'>
                    <Layout>
                        <h2 style={{ fontWeight: 'bold' }}>Verifiable Credential</h2>
                        <a className='btn btn-primary' onClick={onBackHandler}>Back</a>
                        <br/>
                        <Row style={{}} justify="space-between">
                            <Col>
                                {credential?.type.map((type) => {
                                return (
                                    <Tag color="geekblue" key={type}>
                                        {type}
                                    </Tag>
                                    )
                                })}
                            </Col>
                        </Row>
                    </Layout>
           
            <JsonBlock
                title="Credential Subject"
                data={credential?.credentialSubject}
                isLoading={credentialLoading}
            />
  
            {/* <Card bodyStyle={{ padding: 0 }} title="Activity">
                <Table
                    loading={credentialHistoryLoading}
                    onRow={(record) => {
                return {
                        // onClick: (e) => history.push('/credential/' + record.hash),
                    }
                }}
                    rowKey={(record) => record.hash}
                    columns={historyColumns}
                    dataSource={credentials}
                    pagination={false}
                />
            </Card> */}
            <JsonBlock
                title="Raw JSON"
                data={credential}
                isLoading={credentialLoading}
            />
                </div>
                <div className='col-md-3'>
                    <br/>
                    {rightContent()} &nbsp;
                </div>
            </div>
        </Fragment>    
    )
}
export default CredentialDetails;