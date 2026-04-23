import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";

export default function Home() {

  const [recipes, setRecipes] = useState([]);

  const [filter, setFilter] = useState("Semua");

  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
};

  useEffect(() => {
  setLoading(true);
  fetch("http://localhost:5000/api/recipes")
    .then((res) => {
      if (!res.ok) throw new Error("Gagal ambil data");
      return res.json();
    })
    .then((data) => {
      setRecipes(data);
      setError("");
    })
    .catch(() => setError("Gagal mengambil data"))
    .finally(() => setLoading(false));
}, []);

  const addRecipe = (newRecipe) => {
  fetch("http://localhost:5000/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecipe),
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((data) => setRecipes((prev) => [...prev, data]))
    .catch(() => alert("Gagal menambah resep"));
};

  const deleteRecipe = (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus resep ini?");

  if (!confirmDelete) return;

  fetch(`http://localhost:5000/api/recipes/${id}`, {
    method: "DELETE",
  })
  .then(() => {
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    })
    .catch(() => {
      alert("Gagal menghapus resep");
    });
};

const updateRecipe = async (updatedRecipe) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/recipes/${updatedRecipe._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      }
    );

    const data = await res.json();

    console.log("RESPONSE UPDATE:", res.status, data);

    if (!res.ok) {
      throw new Error(data?.message || "Update gagal");
    }

    setRecipes((prev) =>
      prev.map((r) => (r._id === data._id ? data : r))
    );

    setEditingRecipe(null);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    alert("Gagal update resep");
  }
};

  const filteredRecipes =
    filter === "Semua"
      ? recipes
      : recipes.filter((r) => r.level === filter);
  
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
  start,
  start + itemsPerPage
);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / itemsPerPage)
  );

  useEffect(() => {
  setCurrentPage(1);
}, [filter]);

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
}, [currentPage, totalPages]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
  <h2>Daftar Resep</h2>

  <button
  onClick={() => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  }}
  style={{ marginBottom: "10px" }}
>
  + Tambah Resep
</button>

  {isModalOpen && (
  <div
    onClick={() => setIsModalOpen(false)}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "400px"
      }}
    >
      <RecipeForm
        onAdd={async (data) => {
          await addRecipe(data);
          alert("Resep berhasil disimpan");
          setIsModalOpen(false); 
        }}
        onUpdate={async (data) => {
          try {
            await updateRecipe(data);
            alert("Resep berhasil diupdate");
            setIsModalOpen(false);
          } catch (err) {
            alert("Gagal update resep");
          }
        }}
          
          
        editingRecipe={editingRecipe}
      />

      <button
        onClick={() => setIsModalOpen(false)}
        style={{ marginTop: "10px" }}
      >
        Close
      </button>
    </div>
  </div>
)}

  <select
    onChange={(e) => {
      setFilter(e.target.value);
      setCurrentPage(1); 
    }}
    style={{ margin: "15px 0", padding: "5px" }}
  >
    <option>Semua</option>
    <option>Mudah</option>
    <option>Sedang</option>
    <option>Sulit</option>
  </select>

  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}
  {!loading && filteredRecipes.length === 0 && (
  <p>Tidak ada resep</p>
)}

  {paginatedRecipes.map((item) => (
    <RecipeCard
      key={item._id}
      recipe={item}
      onDelete={deleteRecipe}
      onEdit={handleEdit}
    />
  ))}

  <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
  
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Prev
  </button>

  <span>
    Page {currentPage} / {Math.ceil(filteredRecipes.length / itemsPerPage)}
  </span>

  <button
    disabled={currentPage * itemsPerPage >= filteredRecipes.length}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>

</div>
</div>
  );
}