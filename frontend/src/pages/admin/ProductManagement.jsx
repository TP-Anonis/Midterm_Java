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
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
  TablePagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../api/axiosConfig';
import ProductEditModal from '../../components/product/ProductEditModal';
import ProductCreateModal from '../../components/product/ProductCreateModal';
import ProductDetailModal from '../../components/product/ProductDetailModal';

const categories = ['Chơi game', 'Văn phòng', 'Không dây', 'Có dây', 'Ergonomic'];
const brands = [
  'Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft',
  'HP', 'Dell', 'ASUS', 'Zowie', 'HyperX'
];

const formatVND = (price) => {
  if (typeof price !== 'number') return '0 đ';
  return price.toLocaleString('vi-VN') + ' đ';
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    name: '',
    minPrice: undefined,
    maxPrice: undefined,
    sort: 'price,desc',
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async (page = 0, rowsPerPage = 10, filters = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/products/search', {
        params: {
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          name: filters.name || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort || undefined,
          page,
          size: rowsPerPage,
        },
      });
      if (response.data.statusCode === 200) {
        setProducts(response.data.data.content);
        setPagination({
          page,
          rowsPerPage: response.data.data.size,
          total: response.data.data.totalElements,
        });
      } else {
        throw new Error('Lỗi khi tải danh sách sản phẩm.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Lỗi khi tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page, pagination.rowsPerPage, filters);
  }, []);

  const handleTableChange = (event, newPage) => {
    fetchProducts(newPage, pagination.rowsPerPage, filters);
    setPagination({ ...pagination, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    fetchProducts(0, newRowsPerPage, filters);
    setPagination({ ...pagination, page: 0, rowsPerPage: newRowsPerPage });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    const newFilters = { ...filters, name: value };
    setFilters(newFilters);
    fetchProducts(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleFilterChange = (key) => (event) => {
    const value = event.target.value;
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchProducts(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleEditProduct = (productId) => {
    setSelectedProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setIsDetailModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/api/products/${productToDelete}`);
      if (response.status === 204) {
        alert('Xóa sản phẩm thành công!');
        fetchProducts(pagination.page, pagination.rowsPerPage, filters);
      } else {
        alert('Lỗi khi xóa sản phẩm.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Lỗi khi xóa sản phẩm.');
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const columns = [
    { id: 'name', label: 'Tên', sortable: true },
    { id: 'price', label: 'Giá', sortable: true, render: (price) => formatVND(price) },
    { id: 'category', label: 'Danh mục', sortable: true },
    { id: 'brand', label: 'Thương hiệu', sortable: true },
    { id: 'views', label: 'Lượt xem', sortable: true },
    { id: 'soldQuantity', label: 'Đã bán', sortable: true },
    {
      id: 'action',
      label: 'Hành động',
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Xem chi tiết">
            <IconButton color="primary" onClick={() => handleViewProduct(record.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa">
            <IconButton color="primary" onClick={() => handleEditProduct(record.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton color="error" onClick={() => handleDeleteProduct(record.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827' }}>
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Tạo mới
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên sản phẩm"
              onChange={handleSearch}
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Lọc theo danh mục</InputLabel>
              <Select
                value={filters.category}
                onChange={handleFilterChange('category')}
                label="Lọc theo danh mục"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Lọc theo thương hiệu</InputLabel>
              <Select
                value={filters.brand}
                onChange={handleFilterChange('brand')}
                label="Lọc theo thương hiệu"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Giá tối thiểu"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice')({ target: { value: e.target.value ? parseFloat(e.target.value) : undefined } })}
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              type="number"
              label="Giá tối đa"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice')({ target: { value: e.target.value ? parseFloat(e.target.value) : undefined } })}
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          </Grid>
        </Grid>
      </Paper>

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
            {products.map((product) => (
              <TableRow key={product.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ color: '#4b5563' }}>
                    {column.render ? column.render(product[column.id], product) : product[column.id]}
                  </TableCell>
                ))}
              </TableRow>
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

      <ProductEditModal
        open={isEditModalOpen}
        productId={selectedProductId}
        onClose={() => setIsEditModalOpen(false)}
        onProductUpdated={() => fetchProducts(pagination.page, pagination.rowsPerPage, filters)}
      />

      <ProductCreateModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProductCreated={() => fetchProducts(pagination.page, pagination.rowsPerPage, filters)}
      />

      <ProductDetailModal
        open={isDetailModalOpen}
        productId={selectedProductId}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#f59e0b', marginRight: 8 }}>⚠</span> Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} color="inherit">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;