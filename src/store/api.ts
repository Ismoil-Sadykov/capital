import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Application, News, Vacancy } from "../app/types/type";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["News", "Vacancies"],
  endpoints: (builder) => ({
    getPosts: builder.query<News[], void>({
      query: () => ({
        url: "/news",
        method: "GET",
      }),
      providesTags: ["News"],
    }),
    getVacancies: builder.query<Vacancy[], void>({
      query: () => ({
        url: "/vacancies",
        method: "GET",
      }),
      providesTags: ["Vacancies"],
    }),
    getPartnerApplications: builder.query<Application[], void>({
      query: () => ({
        url: "/partnerApplications",
      }),
    }),
    getVacancyApplications: builder.query<Application[], void>({
      query: () => ({
        url: "/vacancyApplications",
      }),
    }),
    addNews: builder.mutation<News, Partial<News>>({
      query: (body) => ({
        url: "/news",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["News"],
    }),
    deleteNews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
    deleteVacancy: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vacancies"],
    }),
    addVacancy: builder.mutation<Vacancy, Omit<Vacancy, "id">>({
      query: (body) => ({
        url: "/vacancies",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Vacancies"],
    }),
    updateNews: builder.mutation<void, { id: string | string[]; data: News }>({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["News"],
    }),
    updateVacancy: builder.mutation<void, { id: string | string[]; data: News }>(
      {
        query: ({ id, data }) => ({
          url: `/vacancies/${id}`,
          method: "PUT",
          data,
        }),
        invalidatesTags: ["Vacancies"],
      },
    ),
  }),
});

export const {
  useGetPostsQuery,
  useGetVacanciesQuery,
  useGetPartnerApplicationsQuery,
  useGetVacancyApplicationsQuery,
  useAddNewsMutation,
  useDeleteNewsMutation,
  useDeleteVacancyMutation,
  useAddVacancyMutation,
  useUpdateNewsMutation,
  useUpdateVacancyMutation,
} = api;
