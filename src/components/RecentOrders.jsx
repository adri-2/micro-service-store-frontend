import React from 'react';

const RecentOrders = ({ orders }) => {
  return (
    <div className="surface">
      <div className="surface-header">
        <h2 className="surface-title">Dernières commandes</h2>
        <p className="surface-subtitle">Les 5 commandes les plus récentes.</p>
      </div>
      <div className="p-5">
      {orders.length === 0 ? (
        <p className="text-sm text-slate-500">Aucune commande récente.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{order.client_name || 'Client'}</p>
                <p className="text-sm text-slate-500">#{order.id.slice(0, 8)}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    order.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : order.status === 'Pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {order.status}
                </span>
                <p className="mt-1 text-sm font-semibold text-slate-900">{order.total_amount} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default RecentOrders;