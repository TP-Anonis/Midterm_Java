import { Typography, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const { Title } = Typography;

const ChangePassword = () => {
    const { token, isAuthenticated } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        if (!isAuthenticated) {
            message.error('Vui lòng đăng nhập để đổi mật khẩu!');
            return;
        }
        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/change-password`,
                {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                },
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    withCredentials: true,
                }
            );
            message.success('Đổi mật khẩu thành công!');
            form.resetFields();
        } catch (error) {
            message.error('Lỗi khi đổi mật khẩu: ' + (error.response?.data?.message || 'Lỗi server'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
            <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2 text-center">
                Đổi mật khẩu
            </Title>
            <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu hiện tại"
                            size="large"
                            className="rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            size="large"
                            className="rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Xác nhận mật khẩu mới"
                            size="large"
                            className="rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                            className="rounded-md bg-blue-600 hover:bg-blue-700 border-none font-semibold"
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;