export type News = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
};

export type Vacancy = {
  id: string;
  experience: string;
  city: string;
  title: string;
  description: string;
  date: string;
};

export type Application = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  date: string;
  message: string;
};