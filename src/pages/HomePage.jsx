import { useState, useEffect } from "react";
import { getAllCategories } from "../services/categoryService";
import CategoryCard from "../components/categories/CategoryCard";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Learn and Teach Skills in Your Community
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Explore Categories</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
