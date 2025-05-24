import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/user/Home';
import ProductList from './pages/user/ProductList';
import ProductDetail from './pages/user/ProductDetail';
import Cart from './pages/user/Cart';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Login from './pages/user/Login';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Register from './pages/user/Register';
import ChangePassword from './pages/user/ChangePassword';
import ForgotPassword from './pages/user/ForgotPassword';
import { AuthProvider } from './pages/contexts/AuthContext';
import { CartProvider } from './pages/contexts/CartContext';

const { Content, Header: AntHeader, Footer: AntFooter } = Layout;

// Layout chính để quản lý header động
const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Layout>
      <AntHeader style={{ padding: 0 }}>
        {isAdminRoute ? <AdminHeader /> : <Header />}
      </AntHeader>
      <Layout>
        <Outlet />
      </Layout>
      <AntFooter style={{ textAlign: 'center' }}>
        <Footer />
      </AntFooter>
    </Layout>
  );
};

// Layout cho các trang user không có Sidebar
const HomeLayout = ({ children }) => (
  <Layout>
    <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px - 70px)' }}>
      {children}
    </Content>
  </Layout>
);

// Layout cho các trang user có Sidebar
const UserLayout = ({ children }) => (
  <Layout hasSider>
    <Sidebar />
    <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px - 70px)' }}>
      {children}
    </Content>
  </Layout>
);

// Layout cho các trang admin
const AdminLayout = ({ children }) => (
  <Layout hasSider>
    <AdminSidebar />
    <Content style={{ padding: 24, minHeight: 'calc(100vh - 64px - 70px)' }}>
      {children}
    </Content>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
            <Route path="/products" element={<HomeLayout><ProductList /></HomeLayout>} />
            <Route path="/products/:id" element={<HomeLayout><ProductDetail /></HomeLayout>} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Cart />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Orders />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <Profile />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <UserLayout>
                    <ChangePassword />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout>
                    <UserManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout>
                    <ProductManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout>
                    <OrderManagement />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;