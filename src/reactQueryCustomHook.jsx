import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["task"],
    queryFn: () => customFetch.get("/"),
  });

  return { isLoading, data, isError, error };
};

export const useCreateTasks = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (createTask) => customFetch.post("/", { title: createTask }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "tasks" });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, isLoading };
};

export const useEditTasks = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, isDone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: (taskId) => {
      console.log(taskId);

      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask, isLoading };
};
