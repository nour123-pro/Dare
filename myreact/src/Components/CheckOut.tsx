import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Reverting to the standard import path without the file extension.
import { useCart, CartProduct } from '../Contexts/CartContext'; 
import { Product } from '../interfaces/ProductInterface'; 
import { Address, Country } from '../interfaces/ReviewInterface.tsx';
import { PlaceOrder } from '../data/OrderServices.tsx';
import { FaS } from 'react-icons/fa6';

// Define mock costs (for display purposes)
const SHIPPING_COST = 10.00;
const TAX_RATE = 0.05; // 5%
export interface ProductOrderItem {
  productId: string;
  quantity: number;
}
let defaultcountry:Country={
   CountryName:"Lebanon",
   City:"Beriut"

}
const defaultzipcode="20383054";
const fullname=localStorage.getItem("fullname");
const email=localStorage.getItem("email");
const UserId=localStorage.getItem("UserId");

/**
* Represents the complete request body for creating a new order.
* Corresponds to the C# OrderCreateRequest model.
* * Note: The Address interface is expected to be imported from 'ReviewInterface.tsx'.
*/

export interface OrderCreateRequest {
  accountId: string; // [Required] AccountId is Required
  products: ProductOrderItem[]; // [Required] Products are Required
  orderDate: string; // Using string (ISO 8601 format) for DateTime representation
  notes?: string | null; // Optional notes
  orderAddress: Address; // [Required] Order address is required
}
// Define initial state for the Address/Shipping form
const initialAddressState = {
    fullName: fullname,
    email: email,
    streetAddress: '',
    city: '',
    zipCode: defaultzipcode?defaultzipcode:"1234321",
    country: defaultcountry
};

// Define initial state for the Payment form (simplified for mock)
interface PaymentDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardholderName: string;
}

const initialPaymentState: PaymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
};

export default function CheckOut() {
    // 1. Fetch cart data and actions
    const { cartItems } = useCart();
    const navigate = useNavigate();

    // 2. Use single state objects for form data
    const [isProcessing, setIsProcessing] = useState(false);
    const [shippingDetails, setShippingDetails] = useState<any>(initialAddressState);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(initialPaymentState);


    // 3. Generic change handler for the Shipping form
    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // 4. Generic change handler for the Payment form
    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // 5. Calculate financial totals using useMemo for efficiency
    const { subtotal, totalTax, grandTotal } = useMemo(() => {
        const subtotalCents = cartItems.reduce((totalCents: number, item: CartProduct) => {
            const priceInCents = Math.round(Number(item.productPrice) * 100);
            return totalCents + (priceInCents * item.quantity);
        }, 0);

        const subtotal = subtotalCents / 100;
        const totalTax = subtotal * TAX_RATE;
        const grandTotal = subtotal + totalTax + SHIPPING_COST;

        return {
            subtotal,
            totalTax,
            grandTotal,
        };
    }, [cartItems]);

    // Format number to currency string
    const formatCurrency = (amount: number) => amount.toFixed(2);

    // Handle the final checkout process (mock implementation)
    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setIsProcessing(true);
        
        // NOW we can easily access all form data from the single state objects:
        console.log("--- Order Details ---");
        console.log("Shipping:", shippingDetails);
        console.log("Payment:", paymentDetails);
        console.log("Cart Items:", cartItems);
        console.log("Order Total:", formatCurrency(grandTotal));
        const data:OrderCreateRequest={
          accountId:UserId||"",
          products:cartItems,
          orderDate:new Date().toISOString(),
          orderAddress:{
            country:shippingDetails.country,
            streetName:'haret hreik'
            
          }
          


        }
        const result=await PlaceOrder(data);
        alert(result.message);
        setIsProcessing(false);
        navigate("/");

       
    };

    if (cartItems.length === 0 && !isProcessing) {
        return (
            <div className="p-8 max-w-2xl mx-auto mt-20 text-center bg-white rounded-xl shadow-lg" style={{fontFamily:'sans-serif'}}>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Please add items to your cart before checking out.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 " style={{fontFamily:'sans-serif'}}>
            <div className="max-w-7xl mx-auto pt-7">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Checkout <i className="fi fi-tc-dollar text-indigo-600"></i>
                </h1>

                {/* Main Checkout Grid: Shipping/Payment (Left) | Summary (Right) */}
                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
                    
                    {/* LEFT COLUMN: Shipping and Payment Information (2/3 width on desktop) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Shipping Information Section */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center">
                                <i className="fi fi-rs-truck-side mr-3 text-indigo-500"></i> Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* NOTE: Added name, value, and onChange attributes */}
                                <input type="text" name="fullName" placeholder="Full Name" required 
                                    value={shippingDetails.fullName} onChange={handleShippingChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                
                                <input type="email" name="email" placeholder="Email Address" required 
                                    value={shippingDetails.email} onChange={handleShippingChange} 
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                
                                <input type="text" name="streetAddress" placeholder="Street Address" required 
                                    value={shippingDetails.streetAddress} onChange={handleShippingChange} 
                                    className="sm:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                
                                <input type="text" name="city" placeholder="City" required 
                                    value={shippingDetails.country.City} onChange={handleShippingChange} 
                                    className="p-3 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                                
                                <input type="text" name="zipCode" placeholder="Zip Code" 
                                    value={shippingDetails.zipCode} 
                                    className="p-3 border border-gray-300 rounded-lg bg-gray-50 " readOnly/>
                                
                                <input type="text" name="country" placeholder="Country" required 
                                    value={shippingDetails.country.CountryName} onChange={handleShippingChange} 
                                    className="sm:col-span-2 p-3 border border-gray-300 rounded-lg  bg-gray-50"  readOnly/>
                            </div>
                        </section>

                        {/* Payment Information Section */}
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center">
                                <i className="fi fi-rs-credit-card mr-3 text-indigo-500"></i> Payment Details
                            </h2>
                            <div className="space-y-4">
                                <input type="text" name="cardNumber" placeholder="Card Number" required 
                                    value={paymentDetails.cardNumber} onChange={handlePaymentChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                <div className="grid grid-cols-3 gap-4">
                                    <input type="text" name="expiryDate" placeholder="MM/YY" required 
                                        value={paymentDetails.expiryDate} onChange={handlePaymentChange}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                    <input type="text" name="cvc" placeholder="CVC" required 
                                        value={paymentDetails.cvc} onChange={handlePaymentChange}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                    <input type="text" name="cardholderName" placeholder="Cardholder Name" required 
                                        value={paymentDetails.cardholderName} onChange={handlePaymentChange}
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Order Summary (1/3 width on desktop) */}
                    <div className="lg:col-span-1">
                        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Order Summary</h2>
                            
                            {/* Product List */}
                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {cartItems.map((item: CartProduct) => (
                                    <div key={item.productId} className="flex justify-between text-sm border-b pb-2">
                                        <div className="flex-1 pr-4">
                                            <p className="font-medium text-gray-700">{item.productName}</p>
                                            <p className="text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-700">${formatCurrency(Number(item.productPrice) * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals Breakdown */}
                            <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal:</span>
                                    <span>${formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping:</span>
                                    <span>${formatCurrency(SHIPPING_COST)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax ({TAX_RATE * 100}%):</span>
                                    <span>${formatCurrency(totalTax)}</span>
                                </div>
                            </div>

                            {/* Grand Total */}
                            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t-2 border-indigo-200">
                                <span>Order Total:</span>
                                <span className="text-indigo-600">${formatCurrency(grandTotal)}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full mt-6 py-3 px-4 font-bold rounded-lg transition duration-300 shadow-md 
                                    ${isProcessing 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
}