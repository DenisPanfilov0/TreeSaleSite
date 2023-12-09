import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import axios from 'axios';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/login', {
        login: values.username,
        password: values.password,
      });


      if (response.data.success) {
        console.log('Авторизация успешна. AccessToken:', response.data.accessToken);
        console.log('RefreshToken:', response.data.refreshToken);
        console.log('user:', response.data.userDate);
      } else {
        console.error('Ошибка при авторизации:', response.data.error);
      }
    } catch (error) {
      console.error('Произошла ошибка при отправке запроса:', error);
      console.log(values.username, values.password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            {/* TODO посмотреть за что отвечает loading=(loading) */}
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}> 
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default App;
