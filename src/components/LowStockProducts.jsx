import React from 'react';

const LowStockProducts = ({ products }) => {
  return (
    <div className="surface">
      <div className="surface-header">
        <h2 className="surface-title">Stock faible</h2>
        <p className="surface-subtitle">Produits à surveiller en priorité.</p>
      </div>
      <div className="p-5">
      {products.length === 0 ? (
        <p className="text-sm text-slate-500">Aucun produit en stock faible.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {products.map((product) => (
            <li key={product.id} className="flex items-center justify-between py-3">
              <span className="font-medium text-slate-900">{product.name}</span>
              <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700">
                {product.available_stock} restants
              </span>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default LowStockProducts;