import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

test('renders brand in navbar', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
  const brandElement = screen.getByText(/ShopLite/i);
  expect(brandElement).toBeInTheDocument();
});
