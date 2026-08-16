import React, { useEffect, useState } from "react";
import { orderService } from "../../api/orderService";
import { Trash2 } from "lucide-react";
import { productService } from "../../api/categorieService";
import { customerService } from "../../api/customerService";
import { useAuthStore } from "../../store/authStore";

function OrderCreater() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const authUser = useAuthStore((state) => state.user);

  const getPersistedAuthUser = () => {
    try {
      const rawAuth = localStorage.getItem("auth");
      if (!rawAuth) return null;

      const parsedAuth = JSON.parse(rawAuth);
      return parsedAuth?.state?.user ?? null;
    } catch {
      return null;
    }
  };

  const currentUser = authUser || getPersistedAuthUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getAll();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // console.error("////////////////////////");
        const res = await customerService.getAll();
        setCustomers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomers();
  }, []);

  const [formData, setFormData] = useState({
    user_id: "",
    client_id: "",
    items: [
      {
        product_id: "",
        quantity: 1,
        price: 0,
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: "", quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(formData.user_id || currentUser?.id)) {
      alert("Utilisateur introuvable, reconnecte-toi.");
      return;
    }

    if (!formData.client_id) {
      alert("Choisis un client avant de créer la commande.");
      return;
    }

    if (
      formData.items.some(
        (item) => !item.product_id || Number(item.quantity) <= 0,
      )
    ) {
      alert("Chaque ligne doit avoir un produit et une quantité valide.");
      return;
    }

    try {
      await orderService.create({
        user_id: formData.user_id || currentUser?.id,
        client_id: formData.client_id,
        items_input: formData.items.map(({ product_id, quantity }) => ({
          product_id,
          quantity: Number(quantity),
        })),
      });

      alert("Commande créée !");
    } catch (err) {
      console.error(err);
       console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
      const errorData = err?.response?.data;
      const details =
        typeof errorData === "string"
          ? errorData
          : JSON.stringify(errorData || { detail: "Erreur création" });
      alert(`Erreur création: ${details}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary">Confirmer</button>
          <button className="btn-secondary">Annuler</button>
          <button className="btn-secondary">Archiver</button>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary">Brouillon</button>
          <button className="btn-secondary">Comptabilisé</button>
        </div>
      </div>

      <section className="surface p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* HEADER */}
          <div className="grid gap-4 md:grid-cols-2">
                {/* <input
                  type="text"
                  name="user_id"
                  placeholder="User ID"
                  value={formData.user_id || currentUser?.id || ""}
                  readOnly
                  className="border-b-2 focus:outline-none p-2 border-b-[#c1e05d] hover:border-b-primary rounded bg-gray-100 text-gray-700"
                /> */}

            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={
                  currentUser
                    ? `${currentUser.username} (${currentUser.email})`
                    : "Utilisateur non chargé"
                }
                readOnly
                className="input-field"
              />
              <p className="text-xs text-slate-500">
                L'utilisateur connecté est récupéré depuis le localStorage pour
                assurer la traçabilité.
              </p>
            </div>

                {/* <input
                  type="text"
                  name="client_id"
                  placeholder="Client ID"
                  value={formData.client_id}
                  onChange={handleChange}
                  className="border-b-2 focus:outline-none  p-2 border-b-[#c1e05d] hover:border-b-primary rounded"
                /> */}
            <div className="flex flex-col gap-1">
              <select
                name="client_id"
                value={formData.client_id}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Choisir un client</option>

                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ITEMS */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Lignes de commande
              </h2>
              <button type="button" onClick={addItem} className="btn-primary">
                + Ajouter ligne
              </button>
            </div>

            <div className="table-shell">
              <table className="w-full text-left">
                <thead className="table-head">
                  <tr>
                    <th className="px-4 py-3">Produit</th>
                    <th className="px-4 py-3">Quantité</th>
                    <th className="px-4 py-3">Montant</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {formData.items.map((item, index) => (
                    <tr key={index} className="align-top">
                      <td className="p-2">
                          <select
                            name="product_id"
                            id="product_id"
                            value={item.product_id}
                            onChange={(e) => {
                              const productId = e.target.value;
                              const product = products.find(
                                (p) => p.id.toString() === productId,
                              );
                              handleItemChange(index, "product_id", productId);
                              handleItemChange(
                                index,
                                "price",
                                product?.price || 0,
                              );
                            }}
                            className="input-field"
                          >
                            <option value="">Choisir produit</option>
                            {products.map((p) => (
                              <option value={p.id} key={p.id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* <td className="p-2">
                          <input
                            type="text"
                            value={item.product_id}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "product_id",
                                e.target.value,
                              )
                            }
                            className="border p-1 rounded w-full"
                          />
                        </td> */}

                        <td className="p-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value,
                              )
                            }
                            className="input-field"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.price}
                            readOnly
                            className="input-field bg-slate-100"
                          />
                        </td>

                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Créer la commande
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default OrderCreater;
