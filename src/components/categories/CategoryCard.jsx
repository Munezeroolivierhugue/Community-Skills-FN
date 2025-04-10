import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories?categoryId=${category.categoryId}`}
      className="block"
    >
      <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-semibold">{category.categoryName}</h3>
      </div>
    </Link>
  );
}
