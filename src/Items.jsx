import { useQuery } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
import customFetch from "./utils";
const Items = ({ items }) => {
  const result = useQuery({
    queryKey: ["task"],
    queryFn: () => customFetch.get("/"),
  });

  if (result.isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading ...</p>;
  }
  if (result.isError) {
    return <p style={{ marginTop: "1rem" }}>Error ...</p>;
  }

  return (
    <div className="items">
      {result.data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
