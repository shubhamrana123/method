
import { Card } from 'antd';

const JsonBlock = ({ title, data, isLoading }) => {
  return (
    <Card title={title} loading={isLoading}>
      <code>
        <pre>{data && JSON.stringify(data, null, 2)}</pre>
      </code>
    </Card>
  )
}

export default JsonBlock