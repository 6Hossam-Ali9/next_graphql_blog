import { getCategories } from "@/services";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Categories = ({ postCategories }: any) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (postCategories) {
      setCategories(postCategories);
    } else {
      getCategories().then((res: any) => setCategories(res));
    }
  }, [postCategories]);
  return (
    <div className="rounded-lg bg-white shadow-lg p-8 pb-12">
      <h3 className="text-xl font-bold border-b pb-4 mb-8">
        {postCategories ? "Post" : "All"} Categories
      </h3>
      {categories.map((category: any) => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
