export interface ProvinceModel {
  countryCode: string;
  numberPlateCode: string;
  id: number;
  name: string;
  normalizedName: string;
  description: string;
  imageLink: string;
}

export interface TripsModelKamilKoc {
  departureTime: string;
  arrivalTime: string;
  priceTotal: number;
  pricePerPerson: number;
  hours: number;
  minutes: number;
  seatCount: number;
  departureStationName: string;
  arrivalStationName: string;
  busBrandName: string;
  busBrandLogoUrl: string;
  purchaseLink: string;
}

export interface KamilKocSearchResultModel {
  departureCityName: string;
  arrivalCityName: string;
  dateDay: string;
  trips: TripsModelKamilKoc[];
}

export interface FormInterface {
  from: string;
  to: string;
  date: string;
}

export interface RegisterFormInterface {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  email: string;
  id: string;
  jwToken: string;
  roles: string[];
  userName: string;
}

export interface CompanyModel {
  name: string;
  normalizedName: string;
  description: string;
  imageLink: string;
  webSiteUrl: string;
  userComments: string[];
  id: number;
}


export interface ReviewtModel {
  busId: number;
  userName: string;
  commentText: string;
  rate: number;
  time: string;
}

export interface ReviewFormModel {
  busId: number;
  rate: number;
  commentText: string;
}