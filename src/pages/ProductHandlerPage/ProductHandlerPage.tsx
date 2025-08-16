import React, { useEffect, useState } from "react";
import style from './ProductHandlerPage.module.css'
import { Input } from "../../components/Input/Input";
import { MButton } from "../../components/MButton/MButton";
import { Form, useActionData, useNavigate, useLocation } from "react-router";
import { Product } from "../../features/products/models/product";

export const ProductHandlerPage: React.FC = () => {

    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(location.state?.product as Product);
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.product || actionData?.deleted) {
            navigate('/products');
        }
    }, [actionData, navigate]);

    return (
        <div className={style.container}>
            {actionData?.error ? (<span className={style.errorMessage}>{actionData.error}</span>) : null}
            <Form method="post">
                {product ? <Input
                    placeholder='ID'
                    name="id"
                    value={product?.id.toString()}
                    disabled={true}
                    style={{ display: 'none' }}
                /> : null}
                <Input
                    placeholder='Nome'
                    name="name"
                    value={product?.name}
                    onChange={(e) => product ? setProduct({ ...product, name: e.target.value }) : {}}
                />

                <Input
                    placeholder='Categoria'
                    name="category"
                    value={product?.category}
                    onChange={(e) => product ? setProduct({ ...product, category: e.target.value }) : {}}

                />

                <Input
                    placeholder='Preço'
                    name="price"
                    type="number"
                    step="0.01"
                    value={product?.price.toString()}
                    onChange={(e) => product ? setProduct({ ...product, price: parseFloat(e.target.value) }) : {}}
                />
                <Input
                    placeholder='URL imagem'
                    name="pictureUrl"
                    value={product?.pictureUrl}
                    onChange={(e) => product ? setProduct({ ...product, pictureUrl: e.target.value }) : {}}
                />

                <Input
                    placeholder='Descrição'
                    name="description"
                    type="textarea"
                    value={product?.description}
                    onChange={(e) => product ? setProduct({ ...product, description: e.target.value }) : {}}
                />

                <div className={style.actions}>
                    <MButton
                        theme='blue'
                        type="submit"
                    >
                        { product ? 'Editar' : 'Adicionar'}
                    </MButton>
                    <MButton
                        theme='grey'
                        onClick={() => navigate('/products')}
                    >
                        Cancelar
                    </MButton>
                </div>
            </Form>
        </div>
        

    )
}