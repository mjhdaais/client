import { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import './SignUp.css'
import { Form, Input, Checkbox, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../libs/contextLib'
import { onError } from "../libs/errorLib"

import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getReferer, refererByCode } from '../../graphql/queries'

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
  const [isDisabled, setIsDisabled] = useState(true)
  const [refererDisabled, setRefererDisable] = useState(false)
  const [isValidating, setIsValidating] = useState('')
  //const [newClient, setNewClient] = useState(null)
  const [referer, setReferer] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  useEffect(() => {
    if (referer.length === 12) {
      checkReferer()
    }
  }, [referer])

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
      //onError(e)
      ///alert(e, 'Hello its Error complaining')
      setIsLoading(false)
    }

    //console.log(referer, phone, password, cpassword)
  }

  async function checkReferer() {
    setIsValidating('validating')

    try {
      const isExist = await API.graphql(graphqlOperation(refererByCode, { code: referer }))
      //const isExist = await API.graphql(graphqlOperation(getReferer, { id: referer}))
      
      if (isExist.data.refererByCode.items.length === 0) {
        setIsValidating('warning')
        console.log(`${referer} does not exist!`)

      } else {
        setIsValidating('success')
        setRefererDisable(true)
        setIsDisabled(false)
      }

      console.log(isExist, 'its me data', referer)

    } catch(e) {
      setIsValidating('warning')
      setRefererDisable(false)
      setIsDisabled(true)

      console.log(e, 'its me error')
    }
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
          label="Referer Code"
          tooltip="Who refer you to this platform?"
          validateStatus={isValidating}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input your referer number!',
              whitespace: true,
            },
          ]}
        >
          <Input 
            disabled={refererDisabled}
            value={referer}
            onChange={e => setReferer(e.target.value)}
          />
        </Form.Item>

        {/*<Form.Item
          label="Validating"
          hasFeedback
          validateStatus="validating"
          help="The information is being validated..."
        >
          <Input placeholder="I'm the content is being validated" id="validating" />
        </Form.Item>

        <Form.Item label="Success" hasFeedback validateStatus="warning">
          <Input placeholder="I'm the content" id="success" />
        </Form.Item>*/}

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
            disabled={isDisabled}
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
            disabled={isDisabled}
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
            disabled={isDisabled}
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
            I have read and accepted the <Link to="/agreement">agreement</Link>
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