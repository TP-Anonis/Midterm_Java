import { Layout, Menu, Dropdown, Avatar, Button, Drawer, Modal } from 'antd';
import { UserOutlined, MenuOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CartIcon from './CartIcon';
import { useAuth } from '../pages/contexts/AuthContext';
import { useCart } from '../pages/contexts/CartContext';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItemCount } = useCart();
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

  const getSelectedKey = (path) => {
    if (path === '/') return 'home';
    if (path.startsWith('/products')) return 'products';
    if (path.startsWith('/cart')) return 'cart';
    if (path.startsWith('/orders')) return 'orders';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/change-password')) return 'change-password';
    if (path.startsWith('/admin')) return 'admin';
    return '';
  };

  const navItems = [
    { key: 'home', label: <Link to="/">Trang chủ</Link>, style: { minWidth: '95px' } },
    { key: 'products', label: <Link to="/products">Sản phẩm</Link>, style: { minWidth: '95px' } },
  ];

  const baseUserMenuItems = [
    { key: 'cart', label: <Link to="/cart">Giỏ hàng</Link> },
    { key: 'orders', label: <Link to="/orders">Đơn hàng</Link> },
    { key: 'profile', label: <Link to="/profile">Hồ sơ</Link> },
    { key: 'change-password', label: <Link to="/change-password">Đổi mật khẩu</Link> },
    { key: 'logout', label: <span onClick={showLogoutModal}>Đăng xuất</span> },
  ];

  const userMenuItems = user?.role === 'ADMIN'
    ? [...baseUserMenuItems.slice(0, 4), { key: 'admin', label: <Link to="/admin">Quản trị</Link> }, ...baseUserMenuItems.slice(4)]
    : baseUserMenuItems;

  const handleMenuClick = () => {
    onClose();
  };

  const avatarUrl = user?.avatar ? `${import.meta.env.VITE_UPLOADS_URL}/${user.avatar}` : null;

  return (
    <>
      <Header className="bg-gradient-to-r from-blue-900 to-blue-500 px-6 h-16 flex items-center shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-300"
            >
              TechTrend
            </Link>
            {!isMobile && (
              <Menu
                selectedKeys={[getSelectedKey(location.pathname)]}
                mode="horizontal"
                theme="dark"
                items={navItems}
                className="ml-10 bg-transparent border-0"
                style={{ color: '#fff', fontSize: '16px' }}
              />
            )}
          </div>

          <div className="flex items-center gap-4">
            <CartIcon />
            {isMobile ? (
              <>
                <Button
                  type="link"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
                  className="text-white text-lg p-0 hover:text-gray-200 transition-colors duration-300"
                />
                <Drawer
                  title="Menu"
                  placement="right"
                  onClose={onClose}
                  open={drawerVisible}
                  bodyStyle={{ padding: 0 }}
                  headerStyle={{ background: '#1E3A8A', color: '#fff' }}
                >
                  <Menu
                    selectedKeys={[getSelectedKey(location.pathname)]}
                    mode="inline"
                    theme="light"
                    items={navItems}
                    onClick={handleMenuClick}
                    style={{ borderRight: 0 }}
                  />
                  <Menu
                    selectedKeys={[getSelectedKey(location.pathname)]}
                    mode="inline"
                    theme="light"
                    items={
                      isAuthenticated
                        ? userMenuItems
                        : [
                            { key: 'login', label: <Link to="/login">Đăng nhập</Link> },
                            { key: 'register', label: <Link to="/register">Đăng ký</Link> },
                          ]
                    }
                    onClick={handleMenuClick}
                    style={{ borderRight: 0 }}
                  />
                </Drawer>
              </>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-base">{user?.name || 'User'}</span>
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                  <Avatar
                    src={avatarUrl}
                    icon={!avatarUrl && <UserOutlined />}
                    className="cursor-pointer bg-blue-400 hover:scale-110 transition-transform duration-300 shadow-sm"
                  />
                </Dropdown>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <Button
                    type="primary"
                    className="bg-gradient-to-r from-blue-500 to-blue-900 text-white border-none rounded-lg px-4 hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="bg-white text-blue-900 rounded-lg px-4 hover:bg-gray-100 transition-all duration-300"
                  >
                    Đăng ký
                  </Button>
                </Link>
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

export default HeaderComponent;