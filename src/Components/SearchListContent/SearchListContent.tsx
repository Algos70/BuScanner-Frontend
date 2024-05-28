import SearchBusBar from "../SearchBusBar/SearchBusBar";
import CardList from "../BestValueList/CardList";
import Ticket from "../Ticket/Ticket";
import "./SearchListContent.css";
import { CompanyModel, TripsModelKamilKoc } from "../../Models/models";
import { getAllBusCompanies, getAllProvinceNames } from "../../Utils/APIUtils";
import {
  findBestTimePriceRatioTrip,
  findCheapestTrip,
  findFastestTrip,
  formatTime,
} from "../../Utils/Utils";
import { FormInterface } from "../../Models/models";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import CheckBox from "../CheckBox/CheckBox";
interface SearchListContentProps {
  sortTripsByBest: string;
  setSortTripsByBest: (value: "Best" | "Cheapest" | "Fastest") => void;
  trips: TripsModelKamilKoc[];
  formData: FormInterface;
  setFormData: (data: FormInterface) => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  selectedCompanies: string[];
  setSelectedCompanies: (value: string[]) => void;
}

function SearchListContent(props: SearchListContentProps) {
  const [allProvinceNames, setAllProvinceNames] = useState<string[]>([]);
  const [cardValues, setCardValues] = useState([
    { value: 0, header: "Cheapest", time: 0 },
    { value: 0, header: "Best", time: 0 },
    { value: 0, header: "Fastest", time: 0 },
  ]);
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  const constructTickets = (values: TripsModelKamilKoc[]) => {
    const filteredValues = values.filter((ticket) =>
      props.selectedCompanies.length === 0 || props.selectedCompanies.includes(ticket.busBrandName)
    );

    return filteredValues.length !== 0 ? ( filteredValues.map((ticket: TripsModelKamilKoc, index) => (
      <Ticket
        key={index}
        start={formatTime(ticket.departureTime)}
        end={formatTime(ticket.arrivalTime)}
        price={Number(ticket.pricePerPerson)}
        imageLink={ticket.busBrandLogoUrl}
        purchaseLink={ticket.purchaseLink}
        formData={props.formData}
        busBrandName={ticket.busBrandName}
        className={index === 0 ? "first-card" : ""}
      />
    ))
    ) : (
      <div className="no-tickets">
        No tickets available for {props.formData.from} to {props.formData.to} at {props.formData.date}
      </div>
    );
  };

  useEffect(() => {
    getAllProvinceNames().then((response) => {
      setAllProvinceNames(response.data);
      if (props.trips.length === 0 || props.trips === null) return;
      setCardValues([
        {
          value: findCheapestTrip(props.trips)!.pricePerPerson,
          header: "Cheapest",
          time: findCheapestTrip(props.trips)!.hours,
        },
        {
          value: findBestTimePriceRatioTrip(props.trips)!.pricePerPerson,
          header: "Best",
          time: findBestTimePriceRatioTrip(props.trips)!.hours,
        },
        {
          value: findFastestTrip(props.trips)!.pricePerPerson,
          header: "Fastest",
          time: findFastestTrip(props.trips)!.hours,
        },
      ]);
    });
    getAllBusCompanies().then((response) => {
      setCompanies(response.data);
      const names = response.data.map((company: CompanyModel) => company.name);
      props.setSelectedCompanies(names);
    });
  }, [props.trips]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="content-container">
      <SearchBusBar
        setFormData={props.setFormData}
        formData={props.formData}
        provinces={allProvinceNames}
      />

      <div className="filter-and-tickets">
        <div className="filters">
          <div className="company-name-filter">
            <h5>Company Name:</h5>
            {companies.map((company, index) => (
              <CheckBox
                selectedCompanies={props.selectedCompanies}
                setSelectedCompanies={props.setSelectedCompanies}
                index={index}
                companyName={company.name}
              />
            ))}
          </div>
        </div>
        <div className="ticketsInfo">
          <div className="align-container">
            {props.trips.length !== 0 && (
              <CardList
                setSortTripsByBest={props.setSortTripsByBest}
                sortTripsByBest={props.sortTripsByBest}
                values={cardValues}
                setIsLoading={props.setIsLoading}
              />
            )}
            {props.isLoading ? (
              <CircularProgress />
            ) : (
              constructTickets(props.trips)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchListContent;
