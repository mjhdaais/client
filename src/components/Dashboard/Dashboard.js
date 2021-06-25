import 'antd/dist/antd.css'
import './Dashboard.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { Layout, Menu, Typography, Row, Col, Button } from 'antd'
import { DashboardOutlined, HistoryOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

function Dashboard() {
    const history = useHistory()
    const [clientName, setclientName] = useState('')

    useEffect(() => {
        onLoad()
    }, [])

    async function onLoad() {
        try {
            const { attributes } = await Auth.currentAuthenticatedUser()
            //console.log(attributes.phone_number)
            setclientName(attributes.phone_number)
        } catch (error) {
            console.log('error getting attributes: ', error)
        }
    }

    async function signOut() {
        try {
            await Auth.signOut()
            history.push('/signin')
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    height: '100vh'
                }}
            >
                <div className="logo">
                    <Typography.Text strong className="logo-client-name">
                        {clientName}
                    </Typography.Text>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        Overview
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HistoryOutlined />}>
                        Activities
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>
                        Settings
                    </Menu.Item>
                    <Menu.Item 
                        key="4" 
                        icon={<LogoutOutlined />}
                        onClick={signOut}
                    >
                        Sign Out
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    <Typography.Text strong style={{color: '#fff', paddingLeft: 19}}>
                        Revolutional App
                    </Typography.Text>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {/*<Row>
                            <Col span={12}>Stock</Col>
                            <Col span={12}>Profit</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Referal Bonus</Col>
                            <Col span={12}>Loss</Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button type="primary" block>Buy Stock</Button>
                            </Col>
                        </Row>*/}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Revolutional App ©{new Date().getFullYear()}</Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard