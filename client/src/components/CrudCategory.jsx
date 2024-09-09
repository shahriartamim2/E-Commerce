import { useGetCategoriesQuery } from "@/services/categoriesApi";

const CrudCategory = () => {

  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <div>Loading</div>
  if (error) return <div>{error.message}</div>
  if (!data || !data.payload || !data.payload.categories) return <div>Not found</div>

return (
  <div className="p-4">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Index</th>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Edit</th>
          <th className="border px-4 py-2 text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          data.payload.categories.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2 text-blue-500 cursor-pointer">edit</td>
              <td className="border px-4 py-2 text-red-500 cursor-pointer">delete</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)
}

export default CrudCategory;
