import { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
  Stack,
  Collapse,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axiosInstance from '../../api/axiosConfig';
import dayjs from 'dayjs';
import UpdateOrderStatus from '../../components/order/UpdateOrderStatus';
import OrderDetailModal from '../../components/order/OrderDetailModal';

const orderStatuses = ['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusDisplayMap = {
  ALL: 'Tất cả',
  PENDING: 'Đang chờ xử lý',
  CONFIRMED: 'Đã xác nhận',
  SHIPPED: 'Đang giao hàng',
  DELIVERED: 'Đã giao',
  CANCELLED: 'Đã hủy',
};

const statusColorMap = {
  PENDING: '#f59e0b',
  CONFIRMED: '#3b82f6',
  SHIPPED: '#8b5cf6',
  DELIVERED: '#22c55e',
  CANCELLED: '#ef4444',
};

const formatVND = (price) => {
  if (typeof price !== 'number') return '0 đ';
  return price.toLocaleString('vi-VN') + ' đ';
};

const formatDate = (dateString) => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};

const toISOString = (date) => {
  if (!date) return undefined;
  return date.toISOString();
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    status: 'ALL',
    search: '',
    startDate: null,
    endDate: null,
    sort: 'orderDate,desc',
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchOrders = async (page = 0, rowsPerPage = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        status: filters.status !== 'ALL' ? filters.status : undefined,
        search: filters.search || undefined,
        startDate: filters.startDate ? toISOString(filters.startDate) : undefined,
        endDate: filters.endDate
          ? toISOString(dayjs(filters.endDate).hour(23).minute(59).second(59).millisecond(999))
          : undefined,
        sort: filters.sort || undefined,
        page,
        size: rowsPerPage,
      };

      const response = await axiosInstance.get('/api/orders/all', { params });
      if (response.data.statusCode === 200) {
        setOrders(response.data.data.content);
        setPagination({
          page,
          rowsPerPage: response.data.data.size,
          total: response.data.data.totalElements,
        });
      } else {
        throw new Error('Lỗi khi tải danh sách đơn hàng.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pagination.page, pagination.rowsPerPage, filters);
  }, []);

  const handleTabChange = (event, newValue) => {
    const newFilters = { ...filters, status: newValue, search: '' };
    setFilters(newFilters);
    fetchOrders(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleTableChange = (event, newPage) => {
    fetchOrders(newPage, pagination.rowsPerPage, filters);
    setPagination({ ...pagination, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    fetchOrders(0, newRowsPerPage, filters);
    setPagination({ ...pagination, page: 0, rowsPerPage: newRowsPerPage });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchOrders(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleDateRangeChange = (field) => (date) => {
    const newFilters = { ...filters, [field]: date };
    setFilters(newFilters);
    fetchOrders(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const showDetailModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedOrderId(null);
  };

  const handleRowExpand = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const columns = [
    { id: 'id', label: 'Mã đơn', sortable: true },
    { id: 'orderDate', label: 'Ngày đặt', sortable: true, render: (date) => formatDate(date) },
    { id: 'totalAmount', label: 'Tổng tiền', sortable: true, render: (amount) => formatVND(amount) },
    {
      id: 'status',
      label: 'Trạng thái',
      sortable: true,
      render: (status) => (
        <Chip
          label={statusDisplayMap[status] || status}
          sx={{ backgroundColor: statusColorMap[status], color: '#fff', fontWeight: 'medium' }}
        />
      ),
    },
    {
      id: 'shippingAddress',
      label: 'Địa chỉ giao',
      render: (address) => (
        <Tooltip title={address}>
          <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {address}
          </span>
        </Tooltip>
      ),
    },
    { id: 'receiverName', label: 'Người nhận' },
    { id: 'receiverPhone', label: 'Số điện thoại' },
    {
      id: 'action',
      label: 'Hành động',
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Xem chi tiết">
            <IconButton color="primary" onClick={() => showDetailModal(record.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cập nhật trạng thái">
            <UpdateOrderStatus
              orderId={record.id}
              currentStatus={record.status}
              onSuccess={() => fetchOrders(pagination.page, pagination.rowsPerPage, filters)}
            />
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const itemColumns = [
    { id: 'productName', label: 'Tên sản phẩm' },
    {
      id: 'productImage',
      label: 'Hình ảnh',
      render: (image) => (
        <img
          src={`${import.meta.env.VITE_UPLOADS_URL}/${image}`}
          alt="product"
          style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }}
        />
      ),
    },
    { id: 'price', label: 'Giá', render: (price) => formatVND(price) },
    { id: 'quantity', label: 'Số lượng' },
    {
      id: 'total',
      label: 'Tổng',
      render: (_, item) => formatVND(item.price * item.quantity),
    },
  ];

  const expandedRowRender = (record) => (
    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {itemColumns.map((column) => (
              <TableCell key={column.id} sx={{ fontWeight: 'medium', color: '#374151' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {record.items.map((item) => (
            <TableRow key={item.id}>
              {itemColumns.map((column) => (
                <TableCell key={column.id} sx={{ color: '#4b5563' }}>
                  {column.render ? column.render(item[column.id], item) : item[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, bgcolor: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827', mb: 4 }}>
          Quản lý đơn hàng
        </Typography>

        <Paper sx={{ p: 3, mb: 3, border: '1px solid #e5e7eb', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Tìm theo mã đơn hoặc số điện thoại"
                onChange={handleSearch}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="Ngày bắt đầu"
                  value={filters.startDate}
                  onChange={handleDateRangeChange('startDate')}
                  format="DD/MM/YYYY"
                  sx={{ flex: 1 }}
                />
                <DatePicker
                  label="Ngày kết thúc"
                  value={filters.endDate}
                  onChange={handleDateRangeChange('endDate')}
                  format="DD/MM/YYYY"
                  sx={{ flex: 1 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Tabs value={filters.status} onChange={handleTabChange} sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {orderStatuses.map((status) => (
            <Tab key={status} label={statusDisplayMap[status]} value={status} sx={{ fontWeight: 'medium', color: '#374151' }} />
          ))}
        </Tabs>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ fontWeight: 'medium', color: '#374151' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <>
                  <TableRow key={order.id} onClick={() => handleRowExpand(order.id)} sx={{ cursor: 'pointer' }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} sx={{ color: '#4b5563' }}>
                        {column.render ? column.render(order[column.id], order) : order[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={columns.length} sx={{ p: 0, border: 'none' }}>
                      <Collapse in={expandedRow === order.id}>
                        {expandedRowRender(order)}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={pagination.total}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleTableChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} của ${count}`}
          />
        </TableContainer>

        <OrderDetailModal
          orderId={selectedOrderId}
          open={isDetailModalVisible}
          onClose={closeDetailModal}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default OrderManagement;