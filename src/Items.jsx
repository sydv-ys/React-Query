import { useQuery } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
import customFetch from "./utils";
import { useFetchTasks } from "./reactQueryCustomHook";

const Items = ({ items }) => {
  const { isLoading, isError, data } = useFetchTasks();

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading ...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: "1rem" }}>Error ...</p>;
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
