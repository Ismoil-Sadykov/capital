export type News = {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
};

export type Vacancy = {
  id: number;
  experience: string;
  city: string;
  title: string;
  description: string;
  isHidden: boolean;
};

export type Application = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  date: string;
  message: string;
};
