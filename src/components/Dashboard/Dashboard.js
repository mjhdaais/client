import 'antd/dist/antd.css'
import './Dashboard.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createReferer, createClient} from '../../graphql/mutations'
import { clientByReferalCode } from '../../graphql/queries'
import { Layout, Menu, Typography, Row, Col, Button, Progress } from 'antd'
import { DashboardOutlined, HistoryOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

function Dashboard() {
    const history = useHistory()
    const [clientName, setclientName] = useState('Welcome!')

    useEffect(() => {
        onLoad()
    }, [])

    const refererObject = (referalCode) => { return {code: referalCode} }

    const clientObject = (refererCode, referalCode, phoneNumber) => {
        return {
            clientRefererId: refererCode,
            referalCode: referalCode, 
            accountNumber: '',
            accountName: '',
            bankName: '',
            phoneNumber: phoneNumber,
            status: 'CONTRIBUTOR',
            rule: 'GREEN',
            contribution: 0.00,
            referalBonus: 0.00
        }
    }

    const referalCodeGenerator = (phoneNumber) => {
        let code = 'clnt'
        code += phoneNumber.substring(6)
        return code
    }

    async function onLoad() {
        try {
            const { attributes } = await Auth.currentAuthenticatedUser()
            // console.log(attributes['custom:referer'])
            const refererCode = attributes['custom:referer']
            const phoneNumber = attributes['phone_number']
            const referalCode = referalCodeGenerator(attributes['phone_number'])
            const client = await API.graphql(graphqlOperation(clientByReferalCode, { referalCode: referalCode }))

            if (client['data']['clientByReferalCode']['items'].length === 0) {
                try {
                    // Creat Client's Referer Table
                    await API.graphql(graphqlOperation(createReferer, { input: refererObject(referalCode) }))

                    // Creat Client Table
                    await API.graphql(graphqlOperation(createClient, { input: clientObject(refererCode, referalCode, phoneNumber) }))
                } catch (error) {
                    console.log('Error: ', error)
                }
            }
            // console.log(client['data']['clientByReferalCode']['items'].length === 0)
            // console.log(client)
            // console.log(refererObject(code))
            
            // console.log(referalCodeGenerator(attributes.phone_number))
            //setclientName(attributes.phone_number)
            // await API.graphql(graphqlOperation(createReferer, { input: refererValue }))
            // await API.graphql(graphqlOperation(createClient, { input: clientValue }))
        } catch (error) {
            console.log('Error: ', error)
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
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 320 }}>
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
                        <div className="dashboard-overview">
                            <div className="lside">
                                <div className="cntr">
                                    <p>Contribution</p>
                                    <p>N2000.00</p>
                                </div>
                                <div className="refb">
                                    <p>Referal Bonus</p>
                                    <p>N200.00</p>
                                </div>
                                <div className="refc">
                                    <p>Referal Code</p>
                                    <p>CLNT00000000</p>
                                </div>
                            </div>
                            <div className="rside">
                                <div className="blnc">
                                    <p>Balance</p>
                                    <p>N2200.00</p>
                                </div>
                                <div className="prgr">
                                    <Progress type="circle" percent={60} />
                                </div>
                            </div>
                        </div>
                        <div className="actions">
                            <div className="btn-01">
                                <Button>Make Contribution</Button>
                            </div>
                            <div className="btn-02">
                                <Button>Activities</Button>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Revolutional App ©{new Date().getFullYear()}</Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard