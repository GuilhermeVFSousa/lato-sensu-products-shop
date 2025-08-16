import React, { useEffect, useState, useCallback } from 'react';
import { Product } from "../../features/products/models/product";
import { ProductCard } from '../../features/products/components/ProductCard/ProductCard';
import style from './ProductsPage.module.css'
import { Input } from '../../components/Input/Input';
import { MButton } from '../../components/MButton/MButton';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router';
import { MDialog } from '../../components/Dialog/MDialog';
import { ProductService } from '../../features/products/service/ProductService';


export const ProductsPage: React.FC = () => {
  const data = useLoaderData() as Product[];
  const revalidator = useRevalidator();

  const [products, setProducts] = useState<Product[]>(data);
  const [searchCode, setSearchCode] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [handledProduct, setHandledProduct] = useState<Product | null>(null);

  const navigate = useNavigate();

  const handleFilter = useCallback(() => {
    if (searchCode.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.id.toString().includes(searchCode.toString())));
    }
  }, [products, searchCode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFilter();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchCode]);

  useEffect(() => {
    setProducts(data);
    setFilteredProducts(data);
  }, [data]);

  const editProduct = (product: Product) => {
    navigate(`/product/edit/${product.id.toString()}}`, {
      state: { product }
    });
  }

  const deleteProduct = async (product: Product) => {
    await ProductService.deleteProduct(product.id)
    cancelHandleProduct();
    revalidator.revalidate();
  }

  const handleProduct = (product: Product) => {
    setDialogIsOpen(true);
    setHandledProduct(product);
  }

  const cancelHandleProduct = () => {
    setDialogIsOpen(false);
    setHandledProduct(null)
  }

  return (
    <div className={style.products_container}>
      <MDialog
        isOpen={dialogIsOpen}
        onClose={() => cancelHandleProduct()}
        title="Confirmar Ação"
        size="medium"
        variant="warning"
        actions={
          <>
            <MButton onClick={() => cancelHandleProduct()}>Cancelar</MButton>
            <MButton theme='blue' className="primary" onClick={() => deleteProduct(handledProduct as Product)}>
              Confirmar
            </MButton>
          </>
        }
      >
        <p>Tem certeza de que deseja excluir o {handledProduct?.name}?</p>
      </MDialog>
      <div className={style.add_product}>
        <MButton
          theme='pinkellow'
          onClick={() => navigate('/product/add')}
        >+ Adicionar</MButton>
      </div>
      <div className={style.products_search}>
        <Input
          placeholder='Código'
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          onEnterPress={handleFilter}
        />
        <MButton
          theme='blue'
          onClick={handleFilter}
        >
          Filtrar
        </MButton>
      </div>
      <div className={style.products_grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleProduct(product)}
              onEdit={() => editProduct(product)}
            />
          ))
        ) : (
          <h1>Nenhum produto encontrado.</h1>
        )}
      </div>
    </div>
  );
}