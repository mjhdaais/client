import 'antd/dist/antd.css'
import './SignIn.css'
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { Typography } from '@material-ui/core'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'
import { onError } from '../libs/errorLib'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: { span: 6 }
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: { 
      span: 16,  
    }
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
    md: {
      span: 16,
      offset: 6,
    }
  },
}

const signupFormLayout = {
  xs: { span: 20 }, 
  sm: { span: 17 }, 
  md: { span: 10 }, 
  lg: { span: 7 }
}

export default function SignIn() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const validateForm = () => {
    return phone.length > 0 && password.length > 0
  }

  async function handleSubmit(e) {
      e.preventDefault()
      
      setIsLoading(true)

      try {
        await Auth.signIn(phone, password)
        userHasAuthenticated(true)
        history.push("/")

      } catch (e) {
        onError(e)
        setIsLoading(false)
      }
  }

  return (
    <>
      <Row justify='center' style={{paddingTop: 12}}>
        <Col {...signupFormLayout}>
          <Form
            name="signin"
            className='signin-form'
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="Phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Phone number" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a 
                className="signin-form-forgot" 
                href="#"
                onClick={e => e.preventDefault()}
                >
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                disabled={!validateForm()}
                loading={isLoading}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              Or <Link to="/signup">SignUp now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}