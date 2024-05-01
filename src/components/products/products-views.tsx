import { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { ProductsModel } from "../../models/products-model";
import { ListItems } from "./products-list-items";
import { GridItems } from "./products-grid-items";
import SelectedCategories from "./selected-categories";
import { useTranslation } from "react-i18next";

const ProductsViews = ({productsData, setSelectedCategories} : any) => {
    const {t} = useTranslation()
    const [products, setProducts] = useState<ProductsModel[]>(productsData);
    const [layout, setLayout] = useState<any>('grid');

    const itemTemplate = (product: ProductsModel, layout: any) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return ListItems(product);
        else if (layout === 'grid') return GridItems(product);
    };

    const header = () => {
        return (
            <div className="flex flex-column md:flex-row gap-3">
                <div className="p-inputgroup flex-1">
                    {t("products_total_quantity")} { products.length } {t("products_total_products")}
                </div>
                <div className="p-inputgroup flex-1">
                    <SelectedCategories selCategories = {setSelectedCategories} />
                </div>
                <div className="p-inputgroup flex-1 justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    };
    
    return (
        <>
            <div className="card">
                <DataView value={ products } 
                    itemTemplate={itemTemplate} 
                    layout={layout} header={header()} />
            </div>
        </>
    );
};

export default ProductsViews;