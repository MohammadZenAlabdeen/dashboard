"use client";
import { useState, useEffect } from "react";
import Spinner from "../main-spinner/spinner";
import CategoryesTableGroupBtn from "./categoryes-table-group-btn";

function CategoryesTable({ role }) {
  const [categoryes, setCategoryes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryes() {
      try {
        setLoading(true);
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategoryes(data);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryes();
  }, []);

  if (loading) return <Spinner />;
  if (!categoryes) return <p>no categories</p>;
  else {
    return (
      <div className="overflow-x-auto rounded-lg mt-4 ">
        <table className="w-full  text-sm text-left rounded-lg text-title-secondary dark:text-gray-400">
          <thead className="text-xs text-secondary uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th
                scope="col"
                className={role == "user" ? "hidden" : "px-6 py-3"}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {(categoryes?.categories).map((category) => (
              <tr
                key={category?._id}
                className="bg-light text-title-black font-semibold border-b dark:bg-gray-800 dark:border-gray-700 border-title-thirdly"
              >
                <td className="px-6 py-4">{category?.name}</td>
                <td className={role == "user" ? "hidden" : "px-6 py-4"}>
                  <CategoryesTableGroupBtn href={category?._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoryesTable;
