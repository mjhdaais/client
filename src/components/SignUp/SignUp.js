import { useState } from 'react'
import 'antd/dist/antd.css'
import './SignUp.css'
import { Form, Input, Checkbox, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../libs/contextLib'
import { onError } from "../libs/errorLib"

import { Auth } from 'aws-amplify'

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

const SignUp = () => {
  const history = useHistory()
  const { userHasAuthenticated } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  //const [newClient, setNewClient] = useState(null)
  const [referer, setReferer] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  const validateForm = () => {
    return (
      referer.length > 0 &&
      phone.length > 0 && 
      password === cpassword
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    setIsLoading(true)

    try {
      const client = await Auth.signUp({
        username: phone,
        password: password,
        attributes: {        
          phone_number: phone, 
          'custom:referer': referer 
        }
      })
      setIsLoading(false)
      //setNewClient(client)
      history.push("/signin")

    } catch (e) {
      onError(e)
      setIsLoading(false)
    }

    console.log(referer, phone, password, cpassword)
}

  return (
    <div className='signup-wrapper'>
      <Form
        {...formItemLayout}
        name="signup"
        scrollToFirstError
      >
      <Form.Item
          name="referer"
          label="Referer Phone Number"
          tooltip="Who refer you to this platform?"
          rules={[
            {
              required: true,
              message: 'Please input your referer number!',
              whitespace: true,
            },
          ]}
        >
          <Input 
            value={referer}
            onChange={e => setReferer(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input 
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password 
            value={cpassword}
            onChange={e => setCPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button 
            type="primary" 
            htmlType="submit"
            disabled={!validateForm()}
            loading={isLoading}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <div className="have-account">
            Already have an account? 
            <Link to="/signin"> Sign in</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp