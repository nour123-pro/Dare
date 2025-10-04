import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const initialProducts: Product[] = [
  { id: 1, name: "Product A", price: 20, quantity: 1 },
  { id: 2, name: "Product B", price: 35, quantity: 2 },
  { id: 3, name: "Product C", price: 15, quantity: 1 },
];

export default function Cart2() {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id: number, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, quantity: Math.max(p.quantity + delta, 0) }
          : p
      )
    );
  };

  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4" style={{fontFamily:'habora'}}>
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {products.map(product => (
        <div key={product.id} className="flex justify-between items-center border-b py-2">
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">${product.price} each</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(product.id, -1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{product.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, +1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="text-right text-lg font-semibold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
