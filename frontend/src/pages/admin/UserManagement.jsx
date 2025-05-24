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
import UserDetailModal from '../../components/user/UserDetailModal';
import UserEditModal from '../../components/user/UserEditModal';
import UserCreateModal from '../../components/user/UserCreateModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    email: '',
    phone: '',
    role: '',
    gender: '',
  });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async (page = 0, rowsPerPage = 10, filters = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/admin/users', {
        params: {
          page,
          size: rowsPerPage,
          email: filters.email || undefined,
          phone: filters.phone || undefined,
          role: filters.role || undefined,
          gender: filters.gender || undefined,
        },
      });
      if (response.data.statusCode === 200) {
        setUsers(response.data.data.content);
        setPagination({
          page,
          rowsPerPage: response.data.data.size,
          total: response.data.data.totalElements,
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Lỗi khi tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.page, pagination.rowsPerPage, filters);
  }, []);

  const handleTableChange = (event, newPage) => {
    fetchUsers(newPage, pagination.rowsPerPage, filters);
    setPagination({ ...pagination, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    fetchUsers(0, newRowsPerPage, filters);
    setPagination({ ...pagination, page: 0, rowsPerPage: newRowsPerPage });
  };

  const handleSearch = (type) => (event) => {
    const value = event.target.value;
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    fetchUsers(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleFilterChange = (type) => (event) => {
    const value = event.target.value;
    const newFilters = { ...filters, [type]: value || '' };
    setFilters(newFilters);
    fetchUsers(0, pagination.rowsPerPage, newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const formatGender = (gender) => {
    switch (gender) {
      case 'MALE':
        return 'Nam';
      case 'FEMALE':
        return 'Nữ';
      case 'OTHER':
        return 'Khác';
      default:
        return gender;
    }
  };

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setIsDetailModalVisible(true);
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalVisible(true);
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/api/admin/users/${userToDelete}`);
      if (response.status === 200 || response.status === 204) {
        alert('Xóa người dùng thành công!');
        fetchUsers(pagination.page, pagination.rowsPerPage, filters);
      } else {
        alert('Xóa người dùng thất bại.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Đã xảy ra lỗi khi xóa người dùng.');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleUserUpdated = () => {
    fetchUsers(pagination.page, pagination.rowsPerPage, filters);
  };

  const columns = [
    { id: 'name', label: 'Tên', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'role', label: 'Vai trò', sortable: true },
    {
      id: 'gender',
      label: 'Giới tính',
      sortable: true,
      render: (text) => formatGender(text),
    },
    { id: 'phone', label: 'Số điện thoại', sortable: true },
    {
      id: 'createdAt',
      label: 'Ngày tạo',
      sortable: true,
      render: (text) => new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      id: 'action',
      label: 'Hành động',
      render: (_, record) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Xem chi tiết">
            <IconButton color="primary" onClick={() => handleViewUser(record.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sửa">
            <IconButton color="primary" onClick={() => handleEditUser(record.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton color="error" onClick={() => handleDeleteUser(record.id)}>
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
          Quản lý người dùng
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateModalVisible(true)}
        >
          Tạo mới
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo email"
              onChange={handleSearch('email')}
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo số điện thoại"
              onChange={handleSearch('phone')}
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <FormControl fullWidth variant="outlined" sx={{ '& .MuiInputBase-root': { minWidth: 150 } }}>
              <InputLabel>Lọc vai trò</InputLabel>
              <Select
                value={filters.role}
                onChange={handleFilterChange('role')}
                label="Lọc vai trò"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <FormControl fullWidth variant="outlined" sx={{ '& .MuiInputBase-root': { minWidth: 150 } }}>
              <InputLabel>Lọc giới tính</InputLabel>
              <Select
                value={filters.gender}
                onChange={handleFilterChange('gender')}
                label="Lọc giới tính"
                sx={{ borderRadius: 4 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="MALE">Nam</MenuItem>
                <MenuItem value="FEMALE">Nữ</MenuItem>
                <MenuItem value="OTHER">Khác</MenuItem>
              </Select>
            </FormControl>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ color: '#4b5563' }}>
                    {column.render ? column.render(user[column.id], user) : user[column.id]}
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

      <UserDetailModal
        open={isDetailModalVisible}
        userId={selectedUserId}
        onClose={() => setIsDetailModalVisible(false)}
        formatGender={formatGender}
        onEdit={handleEditUser}
      />

      <UserEditModal
        open={isEditModalVisible}
        userId={selectedUserId}
        onClose={() => setIsEditModalVisible(false)}
        onUserUpdated={handleUserUpdated}
      />

      <UserCreateModal
        open={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onUserCreated={handleUserUpdated}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#f59e0b', marginRight: 8 }}>⚠</span> Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa người dùng này không?</Typography>
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

export default UserManagement;