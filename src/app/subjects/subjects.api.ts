import http from "@/lib/http";
import { SubjectBodyType, GetSubjectsQueryParamsType } from "./subject.schema";
import queryString from "query-string";
const prefix = "/api/v1/subjects";
const subjectApiRequest = {
  create: (body: SubjectBodyType) =>
    http.post<SubjectBodyType>(`${prefix}/create`, body),
  get: (queryParams: GetSubjectsQueryParamsType) =>
    http.get<any>(`${prefix}?${queryString.stringify(queryParams)}`),
  update: (id: string, body: SubjectBodyType) =>
    http.put<SubjectBodyType>(`${prefix}/${id}`, body),
  delete: (id: string) => http.delete<any>(`${prefix}/${id}`),
};

export default subjectApiRequest;
