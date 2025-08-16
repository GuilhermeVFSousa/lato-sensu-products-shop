import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Product } from '../../../features/products/models/product';
import { ProductsPage } from '../ProductsPage';
import { act } from 'react';

jest.mock('axios');

jest.mock('../../../features/products/components/ProductCard/ProductCard', () => ({
  ProductCard: ({ product }: { product: Product }) => (
    <div data-testid={`product-${product.id}`}>
      {product.name}
    </div>
  )
}));

jest.mock('../../../components/Input/Input', () => ({
  Input: ({ value, onChange, placeholder }: any) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}));

jest.mock('../../../components/MButton/MButton', () => ({
  MButton: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('ProductsPage', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Produto 1', description: 'Desc 1', price: 10, category: 'Categoria 1', pictureUrl: 'url1' },
    { id: 2, name: 'Produto 2', description: 'Desc 2', price: 12, category: 'Categoria 2', pictureUrl: 'url2' },
    { id: 3, name: 'Produto 3', description: 'Desc 3', price: 13, category: 'Categoria 3', pictureUrl: 'url3' },
  ];

  const renderProductsPage = async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ProductsPage />,
          HydrateFallback: () => <div>Loading...</div>,
          loader: async () => (mockProducts),
        },
      ],
      { initialEntries: ['/'] }
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });
  };

  test('deve exibir produtos', async () => {
    await renderProductsPage();

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-2')).toBeInTheDocument();
      expect(screen.getByTestId('product-3')).toBeInTheDocument();
    });
  });

  test('deve filtrar produtos por ID', async () => {
    jest.useFakeTimers();

    await renderProductsPage();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: '1' } });

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument();
      expect(screen.queryByTestId('product-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('product-3')).not.toBeInTheDocument();
    })

    jest.useRealTimers();
  });
});