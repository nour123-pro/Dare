import { useState, useEffect, useContext, createContext } from "react";
import { Product } from "../interfaces/ProductInterface";

const STORAGE_KEY = "productsAdded";

// Extend the base Product type to include quantity
export interface CartProduct extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartProduct[];
    addToCart: (product: Product, quantity?: number) => void;
    updateProductQuantity: (productId: string, newQuantity: number) => void;
    removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Loads the cart data synchronously from localStorage during component initialization.
 * This prevents the timing issues associated with using useEffect for initial loading.
 */
const getInitialCart = (): CartProduct[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsedData = JSON.parse(data);
            // Ensure data is an array before returning
            if (Array.isArray(parsedData)) {
                return parsedData as CartProduct[];
            }
        }
    } catch (error) {
        console.error("Failed to parse cart from local storage:", error);
    }
    // If no data, parsing fails, or data is invalid, return an empty array
    return [];
};


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    
    // Initialize state directly using the synchronous function (THE FIX)
    const [cartItems, setCartItems] = useState<CartProduct[]>(getInitialCart);

    // Effect to sync cart state to localStorage whenever it changes (This is kept)
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to local storage:", error);
        }
    }, [cartItems]);


    // --- Core Cart Logic ---

    // 1. Add/Increment Product to Cart
    const addToCart = (product: Product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId);

            if (existingItem) {
                // If the product exists, update its quantity
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If it's a new product, add it to the cart
                const newCartItem: CartProduct = { ...product, quantity };
                return [...prevItems, newCartItem];
            }
        });
    };

    // 2. Update Product Quantity
    const updateProductQuantity = (productId: string, newQuantity: number) => {
        setCartItems(prevItems => {
            // Filter out the item if the new quantity is 0 or less
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.productId !== productId);
            }

            // Otherwise, update the quantity
            return prevItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    // 3. Remove Product from Cart
    const removeFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };


    const contextValue = {
        cartItems,
        addToCart,
        updateProductQuantity,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// --- Custom Hook to use the Cart ---

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
