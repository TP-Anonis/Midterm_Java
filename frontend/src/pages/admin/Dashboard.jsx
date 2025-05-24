import { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Spin } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from '../../api/axiosConfig';

const { Title } = Typography;

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Gọi API để lấy dữ liệu dashboard
    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/api/admin/dashboard');
                if (response.data.statusCode === 200) {
                    setDashboardData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Hàm định dạng số tiền
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Lấy tháng hiện tại (từ 1-12)
    const currentMonth = new Date().getMonth() + 1; // getMonth() trả về 0-11, cộng 1 để thành 1-12

    // Lọc dữ liệu biểu đồ: chỉ giữ các tháng từ 1 đến tháng hiện tại
    const chartData = (dashboardData?.yearlyRevenueChart || []).filter(
        (item) => item.month <= currentMonth
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Title level={2} className="text-3xl font-bold text-gray-800 mb-6">
                Dashboard
            </Title>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {/* Thống kê */}
                    <Row gutter={[24, 24]} className="mb-6">
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Card
                                title="Doanh thu tháng"
                                bordered={false}
                                className="hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
                            >
                                <p className="text-2xl font-semibold text-blue-600">
                                    {dashboardData ? formatCurrency(dashboardData.currentMonthRevenue) : '0'}
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Card
                                title="Doanh thu năm"
                                bordered={false}
                                className="hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
                            >
                                <p className="text-2xl font-semibold text-blue-600">
                                    {dashboardData ? formatCurrency(dashboardData.currentYearRevenue) : '0'}
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Card
                                title="Tổng người dùng"
                                bordered={false}
                                className="hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
                            >
                                <p className="text-2xl font-semibold text-green-600">
                                    {dashboardData ? dashboardData.totalUsers : '0'}
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6}>
                            <Card
                                title="Đơn hàng chờ"
                                bordered={false}
                                className="hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg"
                            >
                                <p className="text-2xl font-semibold text-red-600">
                                    {dashboardData ? dashboardData.pendingOrders : '0'}
                                </p>
                            </Card>
                        </Col>
                    </Row>

                    {/* Biểu đồ doanh thu năm hiện tại */}
                    <Card
                        title="Biểu đồ doanh thu năm hiện tại"
                        bordered={false}
                        className="bg-white rounded-lg shadow-md"
                    >
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis
                                    dataKey="month"
                                    label={{ value: 'Tháng', position: 'insideBottomRight', offset: -10, fill: '#666' }}
                                    tickFormatter={(month) => `Th${month}`}
                                    style={{ fontSize: '14px' }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Doanh thu (VND)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        dx: -5,
                                        dy: 50,
                                        fill: '#666',
                                    }}
                                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                    style={{ fontSize: '14px' }}
                                />
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    labelFormatter={(label) => `Tháng ${label}`}
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '14px', color: '#666' }} />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Doanh thu"
                                    stroke="#1890ff"
                                    activeDot={{ r: 6, fill: '#1890ff', stroke: '#fff', strokeWidth: 2 }}
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}
        </div>
    );
};

export default Dashboard;