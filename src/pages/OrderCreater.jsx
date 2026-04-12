import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { orderService } from "../api/orderService";
import { Trash2 } from "lucide-react";
import { productService } from "../api/categorieService";
import { customerService } from "../api/customerService";
import { useAuthStore } from "../store/authStore";

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
      alert("Erreur création");
    }
  };

  return (
    <div className="bg-gray-950 h-screen flex flex-col">
      {/* NavBar (taille automatique) */}
      <NavBar />

      {/* CONTENU qui prend le reste */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-4   overflow-auto">
        {/* Actions */}
        <div className="flex justify-between">
          <div className=" flex gap-2">
            <button className="btn-primary">Confirmer</button>
            <button className="btn-primary">Annuler</button>
            <button className="btn-primary">Archiver</button>
          </div>
          {/* status */}
          <div className="relative ">
            <button className="btn-primary border-2 static right-8">
              Brouillon
            </button>
            <button className="btn-primary  ">Comptabilise</button>
            {/* <button className="btn-primary">button</button> */}
          </div>
        </div>

        <section className="">
          {/* Body */}
          {/* <section className="bg-white flex-1 rounded p-4">contenu ici</section> */}
          <div className="flex-1 p-4 ">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded p-6 flex flex-col gap-6"
            >
              {/* HEADER */}
              <div className="grid grid-cols-2 gap-4">
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
                    className="border-b-2 focus:outline-none p-2 border-b-[#c1e05d] hover:border-b-primary rounded bg-gray-100 text-gray-700"
                  />
                  <p className="text-xs text-gray-500">
                    L'utilisateur connecté est récupéré depuis le localStorage
                    pour assurer la traçabilité.
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
                    // className="border p-2 rounded w-full"
                    className="border-b-2 focus:outline-none  p-2 border-b-[#c1e05d] hover:border-b-primary rounded"
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

              {/* ITEMS (STYLE ODOO) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Lignes de commande</h2>
                  <button
                    type="button"
                    onClick={addItem}
                    className="btn-primary"
                  >
                    + Ajouter ligne
                  </button>
                </div>

                <table className="w-full border">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-2">Produit</th>
                      <th className="p-2">Quantité</th>
                      <th className="p-2">Montant</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={index} className="border-t">
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
                            className="border p-1 rounded w-full text-secondary"
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
                            className="border p-1 rounded w-full"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={item.price}
                            readOnly
                            className="border p-1 rounded w-full bg-gray-100"
                          />
                        </td>

                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 cursor-pointer"
                          >
                            {/* <Trash2 /> */}
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SUBMIT */}
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Créer la commande
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OrderCreater;
