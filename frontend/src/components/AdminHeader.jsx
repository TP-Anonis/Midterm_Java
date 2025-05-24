import { Layout, Dropdown, Avatar, Drawer, Button, Menu, Modal } from 'antd';
import { UserOutlined, MenuOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../pages/contexts/AuthContext';

const { Header } = Layout;

const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

const AdminHeader = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    const showLogoutModal = () => {
        setModalVisible(true);
    };

    const handleLogout = () => {
        logout();
        setModalVisible(false);
        navigate('/');
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const adminMenuItems = [
        {
            key: '1',
            label: <Link to="/">Đến trang chủ</Link>,
        },
        {
            key: '2',
            label: <span onClick={showLogoutModal}>Đăng xuất</span>,
        },
    ];

    const avatarUrl = user?.avatar ? `${UPLOADS_URL}/${user.avatar}` : null;

    return (
        <>
            <Header className="bg-white shadow-md px-6 h-16 flex items-center">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/admin" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                        Dashboard
                    </Link>

                    <div className="flex items-center">
                        {isMobile ? (
                            <>
                                <Button
                                    type="link"
                                    icon={<MenuOutlined />}
                                    onClick={showDrawer}
                                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                                />
                                <Drawer
                                    title="Menu"
                                    placement="right"
                                    onClose={onClose}
                                    open={drawerVisible}
                                    bodyStyle={{ padding: 0 }}
                                    headerStyle={{ background: '#6366f1', color: '#fff' }}
                                >
                                    <Menu mode="inline" theme="light" items={adminMenuItems} />
                                </Drawer>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">{user?.name || 'Admin'}</span>
                                <Dropdown menu={{ items: adminMenuItems }} trigger={['click']}>
                                    <Avatar
                                        src={avatarUrl}
                                        icon={!avatarUrl && <UserOutlined />}
                                        className="cursor-pointer bg-indigo-500 hover:scale-110 transition-transform duration-300 shadow-sm"
                                    />
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
            </Header>

            <Modal
                title={
                    <div className="flex items-center">
                        <ExclamationCircleOutlined className="text-yellow-500 mr-2" />
                        Xác nhận đăng xuất
                    </div>
                }
                open={modalVisible}
                onOk={handleLogout}
                onCancel={handleCancel}
                okText="Đăng xuất"
                cancelText="Hủy"
                okButtonProps={{ danger: true, className: 'bg-red-500 hover:bg-red-600' }}
                cancelButtonProps={{ className: 'hover:bg-gray-100' }}
            >
                <p>Bạn có chắc chắn muốn đăng xuất không?</p>
            </Modal>
        </>
    );
};

export default AdminHeader;