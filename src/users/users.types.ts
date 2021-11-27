export type User = {
  id: string;
  image: string;
  email: string;
  username: string;
  password: string;
  stats: Stats;
  isAdmin: boolean;
};

export type Stats = {
  exp: number;
  goodAnswers: number;
  totalAnswers: number;
};
