import 'antd/dist/antd.css'
import './Wallet.css'
import { Layout, Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

function Wallet() {
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{
                    height: '100vh'
                }}
            >
                <div className="logo">Username</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                    nav 4
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    Revolutional App
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Revolutional App ©{new Date().getFullYear()}</Footer>
            </Layout>
        </Layout>
    )
}

export default Wallet