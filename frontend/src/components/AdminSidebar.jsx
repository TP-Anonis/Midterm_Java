import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { DashboardOutlined, PersonOutline, ShoppingCartOutlined, ReceiptOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSelectedKey = (path) => {
    if (path.startsWith('/admin/users')) return 'users';
    if (path.startsWith('/admin/products')) return 'products';
    if (path.startsWith('/admin/orders')) return 'orders';
    return 'dashboard';
  };

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: <Link to="/admin">Dashboard</Link> },
    { key: 'users', icon: <PersonOutline />, label: <Link to="/admin/users">Người dùng</Link> },
    { key: 'products', icon: <ShoppingCartOutlined />, label: <Link to="/admin/products">Sản phẩm</Link> },
    { key: 'orders', icon: <ReceiptOutlined />, label: <Link to="/admin/orders">Đơn hàng</Link> },
  ];

  return (
    <Drawer
      variant="permanent"
      open={!collapsed}
      sx={{
        width: collapsed ? 80 : 220,
        transition: 'width 0.3s',
        '& .MuiDrawer-paper': {
          width: collapsed ? 80 : 220,
          background: 'linear-gradient(to bottom, #eef2ff, #ffffff)',
          boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
          transition: 'width 0.3s',
        },
      }}
    >
      <IconButton
        onClick={() => setCollapsed(!collapsed)}
        sx={{ justifyContent: 'center', color: '#4f46e5', '&:hover': { color: '#4338ca' }, p: 1.5 }}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.key}
            selected={getSelectedKey(location.pathname) === item.key}
            component="div"
            sx={{
              '&.Mui-selected': { background: '#e0e7ff' },
              '&:hover': { background: '#e0e7ff' },
              p: 1,
            }}
          >
            <ListItemIcon sx={{ color: '#4f46e5', minWidth: '40px' }}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} sx={{ color: '#374151' }} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;