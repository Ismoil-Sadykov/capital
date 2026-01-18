import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { Application, News, Vacancy } from "../app/types/type";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<News[], void>({
      query: () => ({
        url: "/news",
        method: "GET",
      }),
    }),

    getVacancies: builder.query<Vacancy[], void>({
      query: () => ({
        url: "/vacancies",
        method: "GET",
      }),
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
  }),
});

export const {
  useGetPostsQuery,
  useGetVacanciesQuery,
  useGetPartnerApplicationsQuery,
  useGetVacancyApplicationsQuery,
} = api;
