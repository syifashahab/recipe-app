import { useState, useEffect } from "react";

export default function RecipeForm({ onAdd, onUpdate, editingRecipe }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Mudah");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errorIngredients, setErrorIngredients] = useState("");
  const [errorSteps, setErrorSteps] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
  if (editingRecipe) {
    setName(editingRecipe.name || "");
    setLevel(editingRecipe.level || "Mudah");
    setIngredients(editingRecipe.ingredients || [""]);
    setSteps(editingRecipe.steps || [""]);
  }
}, [editingRecipe]);

  const handleSubmit = async () => {
    setError("");
    setErrorIngredients("");
    setErrorSteps([]);
    setSuccessMsg("");

    const confirm = window.confirm("Yakin mau simpan resep ini?");
    if (!confirm) return;

    if (!name) {
      setError("Nama resep wajib diisi");
      return;
    }

if (
  ingredients.length === 0 ||
  ingredients.every((i) => i.trim() === "")
  ) {
    setErrorIngredients("Minimal harus ada 1 bahan yang diisi");
    return;
  }

const stepErrors = steps.map((s) =>
  s.trim() === "" ? "Langkah tidak boleh kosong" : ""
);

if (stepErrors.some((err) => err !== "")) {
  setErrorSteps(stepErrors);
  return;
}


  const payload = {
    id: editingRecipe ? editingRecipe._id : Date.now(),
    name,
    level,
    ingredients,
    steps,
  };

  setSubmitting(true);

  try {
    if (editingRecipe) {
      await onUpdate(payload);
    } else {
      await onAdd(payload);
    }

    setSuccessMsg(
      editingRecipe 
      ? "Resep berhasil diupdate!" 
      : "Resep berhasil disimpan!"
    );

    setName("");
    setLevel("Mudah");
    setIngredients([""]);
    setSteps([""]);
  } catch (err) {
    setError("Gagal menyimpan resep");
  } finally {
    setSubmitting(false);
  }

};

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Tambah Resep</h3>

      <input
  placeholder="Nama resep"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

{error && (
  <p style={{ color: "red" }}>{error}</p>
)}

      
      <br /><br />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option>Mudah</option>
        <option>Sedang</option>
        <option>Sulit</option>
      </select>

      <h4>Bahan</h4>

{ingredients.map((item, index) => (
  <input
    key={index}
    value={item}
    onChange={(e) => {
      const newData = [...ingredients];
      newData[index] = e.target.value;
      setIngredients(newData);
    }}
  />
))}

{errorIngredients && (
  <p style={{ color: "red", marginTop: "8px" }}>
    {errorIngredients}
  </p>
)}

      <button onClick={() => setIngredients([...ingredients, ""])}>
        + Bahan
      </button>

      <h4>Langkah</h4>
      {steps.map((item, index) => (
  <div key={index}>
    <input
      value={item}
      onChange={(e) => {
        const newData = [...steps];
        newData[index] = e.target.value;
        setSteps(newData);
      }}
    />

    {errorSteps[index] && (
      <p style={{ color: "red", marginBottom: "8px" }}>
        {errorSteps[index]}
      </p>
    )}
  </div>
))}

      <button onClick={() => setSteps([...steps, ""])}>
        + Langkah
      </button>

      <br /><br />

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting
          ? "Menyimpan..."
          : editingRecipe
          ? "Update"
          : "Simpan"}
      </button>

      {successMsg && (
        <p style={{ color: "green", marginTop: "10px" }}>
          {successMsg}
        </p>
      )}
    </div>
  );
}