import { useState } from "react";

export default function RecipeCard({ recipe, onDelete, onEdit }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      onClick={() => setShowDetail(!showDetail)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer"
      }}
    >
      <h3 style={{ margin: 0 }}>{recipe.name}</h3>
      <p style={{ margin: "5px 0" }}>Level: {recipe.level}</p>

      <button
  onClick={(e) => {
    e.stopPropagation(); 
    onDelete(recipe._id);
  }}
>
  Hapus
</button>

<button
  onClick={(e) => {
    e.stopPropagation();
    onEdit(recipe);
  }}
>
  Edit
</button>

        <div className={`accordion ${showDetail ? "open" : ""}`}>
          <h4>Bahan:</h4>
          <ul>
            {recipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Langkah:</h4>
          <ol>
            {recipe.steps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
    </div>
  );
}