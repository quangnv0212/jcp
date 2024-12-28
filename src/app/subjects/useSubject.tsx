import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { GetSubjectsQueryParamsType, SubjectBodyType } from "./subject.schema";
import subjectApiRequest from "./subjects.api";

export const useGetSubjectsQuery = (
  queryParams: GetSubjectsQueryParamsType
) => {
  return useQuery({
    queryKey: ["subjects", queryParams],
    queryFn: () => subjectApiRequest.get(queryParams),
  });
};

export const useCreateSubjectMutation = () => {
  return useMutation({
    mutationFn: subjectApiRequest.create,
  });
};

export const useUpdateSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }: SubjectBodyType & { id: string }) =>
      subjectApiRequest.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useDeleteSubjectMutation = () => {
  return useMutation({
    mutationFn: subjectApiRequest.delete,
  });
};
