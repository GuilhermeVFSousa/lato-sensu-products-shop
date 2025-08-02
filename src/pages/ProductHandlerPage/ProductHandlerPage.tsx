import React, { useEffect } from "react";
import style from './ProductHandlerPage.module.css'
import { Input } from "../../components/Input/Input";
import { MButton } from "../../components/MButton/MButton";
import { Form, useActionData, useNavigate } from "react-router-dom";

export const ProductHandlerPage: React.FC = () => {
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.product) {
            navigate('/products');
        }
    }, [actionData, navigate]);

    return (
        <div className={style.container}>
            {actionData?.error ? (<span className={style.errorMessage}>{actionData.error}</span>) : null}
            <Form method="post">
                <Input
                    placeholder='Nome'
                    name="name"
                />

                <Input
                    placeholder='Categoria'
                    name="category"
                />

                <Input
                    placeholder='Preço'
                    name="price"
                    type="number"
                    step="0.01"
                />
                <Input
                    placeholder='URL imagem'
                    name="pictureUrl"
                />

                <Input
                    placeholder='Descrição'
                    name="description"
                    type="textarea"
                />

                <div className={style.actions}>
                    <MButton
                        theme='blue'
                        type="submit"
                    >
                        Adicionar
                    </MButton>
                    <MButton
                        theme='grey'
                    >
                        Cancelar
                    </MButton>
                </div>
            </Form>

        </div>

    )
}