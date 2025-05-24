import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useAuth } from '../pages/contexts/AuthContext';
import { useCart } from '../pages/contexts/CartContext'; // Import useCart

const CartIcon = () => {
    const { isAuthenticated } = useAuth();
    const { cartItemCount } = useCart();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Link to="/cart" className="relative flex items-center group">
            <Badge
                count={cartItemCount}
                showZero
                offset={[5, -5]}
                color="#f5222d"
                className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
                style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                }}
            >
                <ShoppingCartOutlined className="text-xl md:text-2xl" />
            </Badge>
        </Link>
    );
};

export default CartIcon;