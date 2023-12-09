import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUnit } from 'effector-react';
import { Button, Form, Input, Row, Col } from 'antd';

import { logIn, $isLoading } from './store'

interface FormValues {
  login: string
  password: string
}

const LogIn = () => {
  const isLoading = useUnit($isLoading)

  const onFinish = (values: FormValues) => logIn(values);

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Form<FormValues>
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}> 
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LogIn;
