import { Layout, Menu, Avatar, Typography, Space } from 'antd';
import { ShoppingCartOutlined, FileTextOutlined, UserOutlined, LockOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../pages/contexts/AuthContext';

const { Sider } = Layout;
const { Text } = Typography;

const menuItems = [
    { key: 'cart', icon: <ShoppingCartOutlined />, label: <Link to="/cart">Giỏ hàng</Link> },
    { key: 'orders', icon: <FileTextOutlined />, label: <Link to="/orders">Đơn hàng</Link> },
    { key: 'profile', icon: <UserOutlined />, label: <Link to="/profile">Hồ sơ</Link> },
    { key: 'change-password', icon: <LockOutlined />, label: <Link to="/change-password">Đổi mật khẩu</Link> },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        const handleResize = () => setCollapsed(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getSelectedKey = (path) => {
        if (path.startsWith('/cart')) return 'cart';
        if (path.startsWith('/orders')) return 'orders';
        if (path.startsWith('/profile')) return 'profile';
        if (path.startsWith('/change-password')) return 'change-password';
        return '';
    };

    const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;
    const avatarUrl = user?.avatar ? `${UPLOADS_URL}/${user.avatar}` : null;

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={200}
            collapsedWidth={80}
            theme="light"
            trigger={
                <div className="text-center py-2 bg-gray-100 rounded-md">
                    {collapsed ? (
                        <RightOutlined className="text-blue-600 hover:text-blue-700" />
                    ) : (
                        <LeftOutlined className="text-blue-600 hover:text-blue-700" />
                    )}
                </div>
            }
            className="shadow-md"
        >
            <div className={collapsed ? 'p-2 text-center' : 'p-4 text-center'}>
                <Space direction="vertical" align="center">
                    <Avatar
                        size={collapsed ? 40 : 64}
                        src={avatarUrl}
                        icon={<UserOutlined />}
                        className="rounded-full shadow-md border-2 border-blue-200"
                    />
                    {!collapsed && (
                        <Text strong className="text-blue-800 text-lg mt-2">
                            {user?.name || 'User'}
                        </Text>
                    )}
                </Space>
            </div>
            <Menu
                mode="inline"
                theme="light"
                items={menuItems}
                defaultSelectedKeys={['cart']}
                selectedKeys={[getSelectedKey(location.pathname)]}
                className="border-none"
                style={{
                    fontSize: '16px',
                }}
                // Tùy chỉnh style cho các item được chọn và hover
                onMouseEnter={(e) => {
                    if (e.node && e.node.key) {
                        const item = document.querySelector(`.ant-menu-item[title="${e.node.label.props.children}"]`);
                        if (item && !item.classList.contains('ant-menu-item-selected')) {
                            item.style.backgroundColor = '#e6f7ff';
                            item.style.color = '#1d39c4';
                        }
                    }
                }}
                onMouseLeave={(e) => {
                    if (e.node && e.node.key) {
                        const item = document.querySelector(`.ant-menu-item[title="${e.node.label.props.children}"]`);
                        if (item && !item.classList.contains('ant-menu-item-selected')) {
                            item.style.backgroundColor = 'transparent';
                            item.style.color = '#595959';
                        }
                    }
                }}
            />
            <style jsx>{`
                .ant-menu-item-selected {
                    background-color: #1890ff !important;
                    color: #fff !important;
                }
                .ant-menu-item-selected .anticon {
                    color: #fff !important;
                }
                .ant-menu-item:hover {
                    background-color: #e6f7ff !important;
                    color: #1d39c4 !important;
                }
                .ant-menu-item:hover .anticon {
                    color: #1d39c4 !important;
                }
            `}</style>
        </Sider>
    );
};

export default Sidebar;