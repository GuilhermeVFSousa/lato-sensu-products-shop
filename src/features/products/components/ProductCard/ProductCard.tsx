import { Product } from "../../models/product";
import React from 'react';
import styles from './ProductCard.module.css';
import { MButton } from "../../../../components/MButton/MButton";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {

  return (
    <div className={styles.product__card}>
      <img className={styles.product__card__img} src={product.pictureUrl} alt={product.name} />
      <div className={styles.product__card__content}>
        <div className={styles.product__card__content__info}>
          <h1>({product.id}) {product.name}</h1>
          <h4>{product.category}</h4>
          <h4>R$ {product.price.toFixed(2)}</h4>
        </div>
        <div className={styles.product__card__content__actions}>
          <MButton theme="grey">Editar</MButton>
          <MButton theme="red">Excluir</MButton>
        </div>
      </div>
  </div>
  );
}