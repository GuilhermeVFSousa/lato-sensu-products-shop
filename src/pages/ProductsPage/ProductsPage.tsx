import React, { useEffect, useState } from 'react';
import { Product } from "../../features/products/models/product";
import { ProductCard } from '../../features/products/components/ProductCard/ProductCard';
import style from './ProductsPage.module.css'
import { Input } from '../../components/Input/Input';
import { MButton } from '../../components/MButton/MButton';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const ProductsPage: React.FC = () => {
  const data = useLoaderData() as Product[];
  
  const [products] = useState<Product[]>(data); // não precisa atualizar
  const [searchCode, setSearchCode] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);

  const handleFilter = () => {
    if (searchCode.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.id.toString().includes(searchCode.toString())));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleFilter();
    }, 500);
  }, [searchCode])

  return (
    <div className={style.products_container}>
      <div className={style.add_product}>
        <Link to={'/product/add'}>
          <MButton 
            theme='pinkellow' 
            onClick={handleFilter}
          >+ Adicionar</MButton>
        </Link>
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
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h1>Nenhum produto encontrado.</h1>
        )}
      </div>
    </div>
  );
}