import { useMemo } from "react";
// Assuming useCart provides: cartItems, updateProductQuantity, removeFromCart
import { useCart } from "../Contexts/CartContext";
import '../assets/cart.css';
import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/ProductInterface";
import CheckOutPage from "./CheckOutPage";

// Define a type for the cart item (product with quantity) if not already in ProductInterface
// We assume 'Product' interface is extended by the cart context to include a 'quantity' property.
interface CartProduct extends Product {
    quantity: number;
}

export default function Cart({ show, onClose }: { show: boolean, onClose: () => void }) {
    // 1. Use cart state and actions directly from the context
    // NOTE: If your useCart() doesn't provide these, you must update your CartContext.
    const { cartItems, updateProductQuantity, removeFromCart } = useCart();
    
    const navigate = useNavigate();

    // 2. Calculate total price whenever cartItems changes
    const totalprice = useMemo(() => {
        return cartItems.reduce((total: number, item: CartProduct) => {
            return total + Number(item.productPrice) * Number(item.quantity);
        }, 0);
    }, [cartItems]);

    // Function to handle quantity change
    const handleQuantityChange = (id: string, delta: number) => {
        const currentItem = cartItems.find(p => p.productId === id);
        if (!currentItem) return;

        const newQuantity = currentItem.quantity + delta;
        
        if (newQuantity <= 0) {
            // Remove item if quantity drops to 0 or below
            removeFromCart(id);
        } else {
            // Update quantity via context function
            updateProductQuantity(id, newQuantity);
        }
    };
    
    // Optional: Sync localStorage on cartItems change (This should really be in the CartContext)
    // useEffect(() => {
    //     localStorage.setItem("productsAdded", JSON.stringify(cartItems));
    // }, [cartItems]);

    const handleCheckout = () => {
        onClose(); // Close the cart sidebar
        navigate('/check'); // Navigate to the checkout page
    }

    return (
        <>
            <div className={`sidebar ${show ? 'show' : ''}`}>
                <span onClick={onClose} className="close">
                    <i className="fi fi-tr-circle-xmark"></i>
                </span>

                <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4" style={{ fontFamily: 'habora' }}>
                    <h2 className="text-2xl font-bold mb-4">Your Cart
                        <i className="fi fi-tc-shopping-cart"></i>
                    </h2>
                    
                    {/* Check the length of cartItems from the context */}
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            {cartItems.map((product: CartProduct) => (
                                <div key={product.productId} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <p className="font-medium">{product.productName}</p>
                                        {/* Use toFixed(2) for currency */}
                                        <p className="text-sm text-gray-500">${product.productPrice} each</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            // Pass -1 to decrease quantity
                                            onClick={() => handleQuantityChange(product.productId, -1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        {/* Display the quantity from the cart item */}
                                        <span>{product.quantity}</span>
                                        <button
                                            // Pass +1 to increase quantity
                                            onClick={() => handleQuantityChange(product.productId, +1)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="text-right text-lg font-semibold">
                                Total: ${totalprice.toFixed(2)}
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                <button onClick={handleCheckout} disabled={cartItems.length === 0}>
                    Checkout
                </button>
            </div>
        </>
    );
}
