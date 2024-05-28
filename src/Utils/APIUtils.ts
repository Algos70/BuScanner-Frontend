import axios, { AxiosRequestConfig } from "axios";
import { DateToDDMMYYYY } from "./Utils";
import {
  FollowModel,
  RegisterFormInterface,
  ReviewFormModel,
} from "../Models/models";

export async function getAllProvinces() {
  const apiAllprovinces = import.meta.env.VITE_GET_ALL_CITIES;

  try {
    const response = await axios.get(apiAllprovinces);
    return response.data;
  } catch (error) {
    console.error("Error fetching all provinces:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getProvinceByName(name: string) {
  const apiProvince = import.meta.env.VITE_GET_CITY_BY_FULL_NAME;

  try {
    const response = await axios.get(`/${apiProvince}/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinceByName:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getTicketsForKamilKoc(
  departure_city_name: string,
  arrival_city_name: string,
  date: string
  // adult?: number
) {
  date = DateToDDMMYYYY(date);
  const kamilKocEndPoint = `City/findtrips/departure_city/country_code/TR/name/${departure_city_name}/arrival_city/country_code/TR/name/${arrival_city_name}/date/${date}/adult/1`;
  try {
    const response = await axios.get(`${kamilKocEndPoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getAllProvinceNames() {
  const apiAllProvinceNames = import.meta.env.VITE_GET_ALL_CITIES_NAME;

  try {
    const response = await axios.get(`/${apiAllProvinceNames}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all province names:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getPopularProvinceNames() {
  const apiPopularProvinceNames = import.meta.env.VITE_GET_POPULAR_CITIES;

  try {
    const response = await axios.get(`/${apiPopularProvinceNames}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all province names:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function register(data: RegisterFormInterface) {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiRegister = import.meta.env.VITE_REGISTER;

  try {
    const response = await axios.post(`${apiURL}/${apiRegister}`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function confirmEmail(userId: string, code: string) {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiConfirmEmail = import.meta.env.VITE_CONFIRM_EMAIL;

  try {
    const response = await axios.get(
      `${apiURL}/${apiConfirmEmail}/?userId=${userId}&code=${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error confirming email:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function login(email: string, password: string) {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiLogin = import.meta.env.VITE_LOGIN;

  try {
    const response = await axios.post(`${apiURL}/${apiLogin}`, {
      email: email,
      password: password,
    });
    localStorage.setItem("userInfo", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getAllBusCompanies() {
  const apiBusCompanies = import.meta.env.VITE_GET_ALL_BUS_COMPANIES;

  try {
    const response = await axios.get(`/${apiBusCompanies}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bus companies:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getBusCompanyById(id: number) {
  const apiBusCompany = import.meta.env.VITE_GET_BUS_COMPANY_BY_ID;

  try {
    const response = await axios.get(`/${apiBusCompany}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bus company by id:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getBusCompanyReviews(busId: number) {
  const apiBusCompanyReviews = import.meta.env
    .VITE_GET_REVIEWS_BY_BUS_COMPANY_ID;

  try {
    const response = await axios.get(`/${apiBusCompanyReviews}/${busId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bus company reviews:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getBusRating(busId: number) {
  const apiBusRating = import.meta.env.VITE_GET_BUS_RATING_BY_ID;

  try {
    const response = await axios.get(`/${apiBusRating}/${busId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bus company rating:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function createReview(review: ReviewFormModel, jwtToken: string) {
  const apiCreateReview = import.meta.env.VITE_POST_REVIEW;
  const headers: AxiosRequestConfig["headers"] = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json", // Adjust content type as needed
  };

  try {
    const response = await axios.post(`/${apiCreateReview}`, review, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function increaseCityPopularityById(id: number) {
  const apiIncreaseCityPopularity = import.meta.env
    .VITE_INCREASE_CITY_POPULARITY;

  try {
    const response = axios.get(`/${apiIncreaseCityPopularity}/${id}`);
    return response;
  } catch (error) {
    console.error("Error increasing city popularity:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function createFollow(form: FollowModel, jwtToken: string) {
  const apiCreateFollow = import.meta.env.VITE_POST_CREATE_FOLLOW;
  const headers: AxiosRequestConfig["headers"] = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json", // Adjust content type as needed
  };

  form.date = DateToDDMMYYYY(form.date);

  try {
    const response = axios.post(`/${apiCreateFollow}`, form, { headers });
    return response;
  } catch (error) {
    console.error("Error creating follow:", error);
    throw error; // re-throw the error after logging it
  }
}

export async function getFollowsByUser(jwtToken: string) {
  const apiGetFollowsByUserId = import.meta.env.VITE_GET_FOLLOWS_BY_USER;
  const headers: AxiosRequestConfig["headers"] = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json", // Adjust content type as needed
  };
  try {
    const response = axios.get(`/${apiGetFollowsByUserId}`, { headers });
    return response;
  } catch (error) {
    console.error("Error getting follows by user id:", error);
    throw error; // re-throw the error after logging it
  }
}
