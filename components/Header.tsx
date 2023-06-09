import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res: any) => setCategories(res));
  }, []);
  return (
    <div className="conatiner mx-auto px-10 mb-8">
      <div className="border-b w-10/12 block border-blue-400 py-8 pb-16 mx-auto">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Next Graph Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-right md:contents">
          {categories.map((category: any) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
