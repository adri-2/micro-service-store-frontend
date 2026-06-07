import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorieService } from "../../api/categorieService";

function CategoriesCreater() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await categorieService.create({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });

      setFormData({ name: "", description: "" });
      alert("Categorie créée !");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      const errorData = err?.response?.data;
      const details =
        typeof errorData === "string"
          ? errorData
          : JSON.stringify(errorData || { detail: "Erreur création" });
      setError(`Erreur création: ${details}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Catalogue
            </p>
            <h1 className="mt-2 text-3xl font-bold">Créer une catégorie</h1>
            <p className="mt-2 text-sm text-gray-400">
              Renseigne le nom et la description pour ajouter une nouvelle
              catégorie au catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="btn-secondary"
          >
            Retour
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-800 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-200"
              >
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Électronique"
                required
                className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-200"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Décris rapidement ce que contient cette catégorie"
                className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-primary"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer la catégorie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriesCreater;
