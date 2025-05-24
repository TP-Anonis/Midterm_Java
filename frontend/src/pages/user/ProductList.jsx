import { Typography, Input, Select, Button, message, Space, Spin, Pagination } from 'antd';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { SearchOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const categories = ['Chơi game', 'Văn phòng', 'Không dây', 'Có dây', 'Ergonomic'];
const brands = [
  'Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft',
  'HP', 'Dell', 'ASUS', 'Zowie', 'HyperX'
];

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const ProductList = () => {
    const { user, token, logout } = useAuth();
    const { updateCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 12,
        totalElements: 0,
        totalPages: 0,
    });
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        name: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        size: 12,
        sort: 'price,desc',
    });
    const [searchInput, setSearchInput] = useState('');
    const searchInputRef = useRef(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        fetchProducts();
    }, [filters]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchInput]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        const queryParams = new URLSearchParams({
            ...(filters.category && { category: filters.category }),
            ...(filters.brand && { brand: filters.brand }),
            ...(filters.name && { name: filters.name }),
            ...(filters.minPrice && { minPrice: filters.minPrice }),
            ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
            page: filters.page,
            size: filters.size,
            sort: filters.sort,
        }).toString();

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/search?${queryParams}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: true,
            });
            const data = response.data;
            if (!data?.data?.content || !Array.isArray(data.data.content)) {
                throw new Error('Dữ liệu sản phẩm không hợp lệ');
            }
            setProducts(data.data.content);
            setPagination({
                currentPage: data.data.pageable?.pageNumber || 0,
                pageSize: data.data.pageable?.pageSize || 12,
                totalElements: data.data.totalElements || 0,
                totalPages: data.data.totalPages || 0,
            });
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
            setError(error.response?.data?.message || 'Lỗi khi tải sản phẩm');
            setProducts([]);
            setPagination({
                currentPage: 0,
                pageSize: 12,
                totalElements: 0,
                totalPages: 0,
            });
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            setFilters(prev => ({ ...prev, name: value, page: 0 }));
        }, 300),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedSearch(value);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 0 }));
    };

    const handleResetFilters = () => {
        setFilters({
            category: '',
            brand: '',
            name: '',
            minPrice: '',
            maxPrice: '',
            page: 0,
            size: 12,
            sort: 'price,desc',
        });
        setSearchInput('');
    };

    const handlePageChange = (page, pageSize) => {
        setFilters(prev => ({ ...prev, page: page - 1, size: pageSize }));
    };

    const handleAddToCart = async (productId) => {
        if (!user) {
            message.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cart/add`,
                { productId, quantity: 1 },
                { headers: token ? { Authorization: `Bearer ${token}` } : {}, withCredentials: true }
            );
            message.success('Đã thêm vào giỏ hàng!');
            updateCart();
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            if (error.response?.data?.message === 'Access Denied') {
                message.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!');
                logout();
            } else {
                message.error(`Lỗi khi thêm vào giỏ hàng: ${error.response?.data?.message || 'Lỗi server'}`);
            }
        }
    };

    const getImageUrl = (image) => (!image ? 'https://via.placeholder.com/150?text=No+Image' : `${import.meta.env.VITE_UPLOADS_URL}/${image}`);

    if (error) return <div className="text-center p-12 text-red-600 text-xl font-medium">{error}</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white min-h-screen">
            <Title level={2} className="text-blue-800 mb-6 font-bold text-3xl border-b-2 border-blue-200 pb-2">Danh Sách Sản Phẩm</Title>
            
            {/* Form lọc */}
            <Space direction="vertical" size="large" className="w-full mb-8">
                <Space wrap className="w-full">
                    <Input
                        ref={searchInputRef}
                        size="large"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        prefix={<SearchOutlined className="text-blue-500" />}
                        className="w-full md:w-64 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    />
                    <Select
                        size="large"
                        placeholder="Danh mục"
                        value={filters.category || undefined}
                        onChange={(value) => handleFilterChange('category', value)}
                        className="w-full md:w-48 rounded-md"
                        allowClear
                    >
                        {categories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                    <Select
                        size="large"
                        placeholder="Thương hiệu"
                        value={filters.brand || undefined}
                        onChange={(value) => handleFilterChange('brand', value)}
                        className="w-full md:w-48 rounded-md"
                        allowClear
                    >
                        {brands.map(brand => (
                            <Option key={brand} value={brand}>{brand}</Option>
                        ))}
                    </Select>
                    <Input
                        size="large"
                        placeholder="Giá tối thiểu"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full md:w-32 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        type="number"
                    />
                    <Input
                        size="large"
                        placeholder="Giá tối đa"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full md:w-32 rounded-md border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        type="number"
                    />
                    <Select
                        size="large"
                        placeholder="Sắp xếp"
                        value={filters.sort}
                        onChange={(value) => handleFilterChange('sort', value)}
                        className="w-full md:w-48 rounded-md"
                    >
                        <Option value="price,desc">Giá: Cao đến thấp</Option>
                        <Option value="price,asc">Giá: Thấp đến cao</Option>
                        <Option value="name,asc">Tên: A-Z</Option>
                        <Option value="name,desc">Tên: Z-A</Option>
                    </Select>
                    <Button
                        size="large"
                        type="primary"
                        onClick={fetchProducts}
                        className="w-full md:w-32 rounded-md bg-blue-600 hover:bg-blue-700 border-none font-semibold"
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        size="large"
                        onClick={handleResetFilters}
                        className="w-full md:w-32 rounded-md bg-gray-200 hover:bg-gray-300 border-none font-semibold"
                    >
                        Xóa bộ lọc
                    </Button>
                </Space>
            </Space>

            {/* Danh sách sản phẩm */}
            {loading ? (
                <div className="text-center p-12">
                    <Spin size="large" className="text-blue-600" />
                    <p className="mt-4 text-gray-600 text-lg">Đang tải sản phẩm...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center p-12 text-gray-600 text-lg bg-white rounded-lg">
                    Không tìm thấy sản phẩm phù hợp.
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
                            >
                                {/* Hình ảnh sản phẩm */}
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    {product.discount && (
                                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            Giảm {product.discount}%
                                        </div>
                                    )}
                                    <img
                                        alt={product.name || 'Sản phẩm'}
                                        src={getImageUrl(product.images?.[0])}
                                        className="w-full h-full object-contain rounded-md"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                                    />
                                </div>

                                {/* Thông tin sản phẩm */}
                                <div className="flex-1 px-4 py-2">
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {product.name || 'Không có tên'}
                                    </h3>
                                    <div className="flex items-center gap-2 my-1">
                                        <p className="text-blue-600 font-bold text-lg">
                                            {(product.price || 0).toLocaleString()} VNĐ
                                        </p>
                                        {product.originalPrice && (
                                            <p className="text-gray-500 line-through text-sm">
                                                {(product.originalPrice || 0).toLocaleString()} VNĐ
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Danh mục: {product.category || 'N/A'} | Thương hiệu: {product.brand || 'N/A'}
                                    </p>
                                </div>

                                {/* Nút hành động */}
                                <div className="flex gap-2 mt-2 md:mt-0">
                                    <Link to={`/products/${product.id}`}>
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            className="rounded-md bg-gray-200 hover:bg-gray-300 border-none text-gray-800 font-semibold"
                                            title="Xem chi tiết"
                                        />
                                    </Link>
                                    <Button
                                        onClick={() => handleAddToCart(product.id)}
                                        icon={<ShoppingCartOutlined />}
                                        className="rounded-md bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold"
                                        title="Thêm vào giỏ hàng"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Phân trang */}
                    <div className="text-center mt-8">
                        <Pagination
                            current={pagination.currentPage + 1}
                            pageSize={pagination.pageSize}
                            total={pagination.totalElements}
                            onChange={handlePageChange}
                            showSizeChanger
                            showQuickJumper
                            disabled={loading}
                            className="pagination-custom"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;