import React, { useEffect, useState } from "react";
import style from './ProductHandlerPage.module.css'
import { Input } from "../../components/Input/Input";
import { MButton } from "../../components/MButton/MButton";
import { Form, useActionData, useNavigate, useLocation } from "react-router";
import { Product } from "../../features/products/models/product";
import { ProductService } from "../../features/products/service/ProductService";

type Tab = 'individual' | 'bulk';

export const ProductHandlerPage: React.FC = () => {

    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(location.state?.product as Product);
    const [activeTab, setActiveTab] = useState<Tab>('individual');
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [bulkResult, setBulkResult] = useState<{ success: number; errors: string[] } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.product || actionData?.deleted) {
            navigate('/products');
        }
    }, [actionData, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.toLowerCase().endsWith('.csv')) {
            setCsvFile(file);
            setBulkResult(null);
        } else {
            alert('Por favor, selecione apenas arquivos CSV');
            e.target.value = '';
        }
    };

    const handleBulkUpload = async () => {
        if (!csvFile) return;

        setIsProcessing(true);
        try {
            const result = await ProductService.uploadFromCSV(csvFile);
            setBulkResult(result);
        } catch (error: Error | any) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={style.container}>
            {actionData?.error ? (<span className={style.errorMessage}>{actionData.error}</span>) : null}
            
            <div className={style.tabs}>
                <button 
                    className={`${style.tab} ${activeTab === 'individual' ? style.activeTab : ''}`}
                    onClick={() => setActiveTab('individual')}
                    type="button"
                >
                    Cadastro Individual
                </button>
                {product ? null : (
                                    <button 
                    className={`${style.tab} ${activeTab === 'bulk' ? style.activeTab : ''}`}
                    onClick={() => setActiveTab('bulk')}
                    type="button"
                >
                    Cadastro em Massa
                </button>
                )}

            </div>

            {activeTab === 'individual' && (
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
                            {product ? 'Editar' : 'Adicionar'}
                        </MButton>
                        <MButton
                            theme='grey'
                            onClick={() => navigate('/products')}
                        >
                            Cancelar
                        </MButton>
                    </div>
                </Form>
            )}

            {activeTab === 'bulk' && (
                <div className={style.bulkContainer}>
                    <div className={style.fileInputContainer}>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className={style.fileInput}
                            id="csvFileInput"
                        />
                        <label 
                            htmlFor="csvFileInput" 
                            className={`${style.fileInputLabel} ${csvFile ? style.hasFile : ''}`}
                        >
                            <svg className={style.fileInputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <div className={style.fileInputText}>
                                {csvFile ? 'Arquivo CSV Selecionado' : 'Selecionar Arquivo CSV'}
                            </div>
                            <div className={style.fileInputSubtext}>
                                {csvFile ? 'Clique para trocar o arquivo' : 'Arraste e solte ou clique para selecionar'}
                            </div>
                        </label>
                        
                        {csvFile && (
                            <div className={style.fileName}>
                                <svg className={style.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14,2 14,8 20,8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                </svg>
                                {csvFile.name}
                            </div>
                        )}
                    </div>

                    <div className={style.actions}>
                        <MButton
                            theme='blue'
                            onClick={handleBulkUpload}
                            disabled={!csvFile || isProcessing}
                        >
                            {isProcessing ? 'Processando...' : 'Processar CSV'}
                        </MButton>
                        <MButton
                            theme='grey'
                            onClick={() => navigate('/products')}
                        >
                            Cancelar
                        </MButton>
                    </div>

                    {/* Results */}
                    {bulkResult && (
                        <div className={style.results}>
                            <h3>Resultado do Processamento:</h3>
                            <p className={style.successMessage}>
                                ✅ {bulkResult.success} produtos cadastrados com sucesso
                            </p>
                            {bulkResult.errors.length > 0 && (
                                <div className={style.errorsContainer}>
                                    <p className={style.errorMessage}>
                                        ❌ {bulkResult.errors.length} erros encontrados:
                                    </p>
                                    <ul className={style.errorsList}>
                                        {bulkResult.errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}