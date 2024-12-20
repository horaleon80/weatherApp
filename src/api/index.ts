import axios from "axios";
import { IGet } from "./types";

export const get = async ({ path = "", params = {} }: IGet) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
    {
      params: {
        ...(typeof params === 'object' && params !== null ? params : {}),
        key: process.env.NEXT_PUBLIC_API_KEY,
      },
    }
  );
  const data = response.data;
  return data;
};
