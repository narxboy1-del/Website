"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  RefreshCcw,
  Shield,
  Check,
  AlertTriangle,
} from "lucide-react";
import {
  type Animal,
  formatPrice,
  getTypeEmoji,
  getTypeLabel,
} from "@/data/animals";

type FormData = Partial<Animal> & {
  imageUrl?: string;
};

export default function AdminPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchAnimals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/animals");
      const data = await res.json();
      setAnimals(data);
    } catch {
      showNotification("Failed to fetch data", "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const showNotification = (
    message: string,
    type: "success" | "error"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const normalizeAnimalPayload = (data: FormData) => {
    const { imageUrl, ...rest } = data;
    const image = imageUrl || rest.image || "";
    const images = imageUrl
      ? [imageUrl]
      : rest.images && rest.images.length > 0
        ? rest.images
        : image
          ? [image]
          : [];

    return {
      ...rest,
      image,
      images,
    };
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.type || !formData.breed) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    try {
      const res = await fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizeAnimalPayload(formData)),
      });

      if (res.ok) {
        showNotification("Animal added successfully!", "success");
        setShowAddForm(false);
        setFormData({});
        fetchAnimals();
      }
    } catch {
      showNotification("Failed to add animal", "error");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/animals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizeAnimalPayload(formData)),
      });

      if (res.ok) {
        showNotification("Animal updated successfully!", "success");
        setEditingId(null);
        setFormData({});
        fetchAnimals();
      }
    } catch {
      showNotification("Failed to update", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/animals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showNotification("Animal deleted successfully!", "success");
        setDeleteConfirm(null);
        fetchAnimals();
      }
    } catch {
      showNotification("Failed to delete", "error");
    }
  };

  const startEdit = (animal: Animal) => {
    setEditingId(animal.id);
    setFormData({ ...animal });
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-earth-50">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 left-1/2 z-50 flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
              notification.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {notification.type === "success" ? (
              <Check size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-forest-600 flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-forest-800">
                Admin Panel
              </h1>
              <p className="text-sm text-earth-400">
                Manage your livestock data
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={fetchAnimals}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-earth-200 text-forest-700 text-sm font-medium hover:bg-earth-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCcw size={16} />
              Refresh
            </motion.button>
            <motion.button
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                setFormData({
                  type: "cow",
                  healthStatus: "good",
                  gender: "male",
                  featured: false,
                  certification: [
                    "veterinary-checked",
                    "halal-certified",
                  ],
                });
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-600 text-white text-sm font-medium hover:bg-forest-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              Add Animal
            </motion.button>
          </div>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl border border-earth-200 p-6 shadow-glass">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-bold text-forest-800">
                    Add New Animal
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({});
                    }}
                    className="p-2 rounded-lg hover:bg-earth-50 text-earth-400"
                  >
                    <X size={18} />
                  </button>
                </div>
                <AnimalForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleAdd}
                  submitLabel="Add Animal"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animals List */}
        {isLoading ? (
          <div className="text-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-forest-200 border-t-forest-600 rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
            <p className="text-earth-400 mt-4">Loading data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {animals.map((animal) => (
              <motion.div
                key={animal.id}
                layout
                className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-glass transition-shadow"
              >
                {editingId === animal.id ? (
                  /* Edit Mode */
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-forest-800">
                        Editing: {animal.name}
                      </h3>
                      <button
                        onClick={cancelEdit}
                        className="p-2 rounded-lg hover:bg-earth-50 text-earth-400"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <AnimalForm
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={() => handleUpdate(animal.id)}
                      submitLabel="Save Changes"
                    />
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex items-center gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-earth-100 shrink-0">
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-forest-800 truncate">
                          {animal.name}
                        </h3>
                        {animal.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-[10px] font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-earth-400">
                        {getTypeEmoji(animal.type)}{" "}
                        {getTypeLabel(animal.type)} · {animal.breed} ·{" "}
                        {animal.weight}kg · {animal.age}mo
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right hidden sm:block">
                      <p className="font-display font-bold text-forest-700">
                        {formatPrice(animal.price)}
                      </p>
                      <p className="text-xs text-earth-400 capitalize">
                        {animal.healthStatus}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button
                        onClick={() => startEdit(animal)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </motion.button>

                      {deleteConfirm === animal.id ? (
                        <div className="flex items-center gap-1">
                          <motion.button
                            onClick={() => handleDelete(animal.id)}
                            className="p-2 rounded-lg bg-red-500 text-white"
                            whileTap={{ scale: 0.9 }}
                          >
                            <Check size={14} />
                          </motion.button>
                          <motion.button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-2 rounded-lg bg-earth-100 text-earth-500"
                            whileTap={{ scale: 0.9 }}
                          >
                            <X size={14} />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          onClick={() => setDeleteConfirm(animal.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-400"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Animals",
              value: animals.length,
              emoji: "📊",
            },
            {
              label: "Cows",
              value: animals.filter((a) => a.type === "cow").length,
              emoji: "🐄",
            },
            {
              label: "Goats",
              value: animals.filter((a) => a.type === "goat").length,
              emoji: "🐐",
            },
            {
              label: "Sheep",
              value: animals.filter((a) => a.type === "sheep").length,
              emoji: "🐑",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 border border-earth-200 text-center"
            >
              <span className="text-2xl">{stat.emoji}</span>
              <p className="text-2xl font-display font-bold text-forest-700 mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-earth-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REUSABLE FORM COMPONENT 
   ============================================================ */
function AnimalForm({
  formData,
  setFormData,
  onSubmit,
  submitLabel,
}: {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  const update = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30 focus:border-forest-400"
            placeholder="e.g., Sultan Al-Baraka"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Type *
          </label>
          <select
            value={formData.type || "cow"}
            onChange={(e) => update("type", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
          >
            <option value="cow">🐄 Cow</option>
            <option value="goat">🐐 Goat</option>
            <option value="sheep">🐑 Sheep</option>
          </select>
        </div>

        {/* Breed */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Breed *
          </label>
          <input
            type="text"
            value={formData.breed || ""}
            onChange={(e) => update("breed", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="e.g., Brahman Premium"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={formData.weight || ""}
            onChange={(e) => update("weight", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="450"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Age (months)
          </label>
          <input
            type="number"
            value={formData.age || ""}
            onChange={(e) => update("age", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="24"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Price (IDR)
          </label>
          <input
            type="number"
            value={formData.price || ""}
            onChange={(e) => update("price", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="28500000"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Color
          </label>
          <input
            type="text"
            value={formData.color || ""}
            onChange={(e) => update("color", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="Dark Brown"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Image URL */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={
              (formData as any).imageUrl || formData.image || ""
            }
            onChange={(e) => update("imageUrl", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            placeholder="https://..."
          />
        </div>

        {/* Health Status */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Health Status
          </label>
          <select
            value={formData.healthStatus || "good"}
            onChange={(e) => update("healthStatus", e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="certified">Certified</option>
          </select>
        </div>

        {/* Featured */}
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Featured
          </label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) => update("featured", e.target.checked)}
              className="accent-forest-500"
            />
            <span className="text-sm text-forest-700">
              Show as Featured
            </span>
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-forest-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-xl bg-earth-50 border border-earth-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400/30 resize-none"
          placeholder="Describe the animal..."
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <motion.button
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest-600 text-white text-sm font-medium hover:bg-forest-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={16} />
          {submitLabel}
        </motion.button>
      </div>
    </div>
  );
}
