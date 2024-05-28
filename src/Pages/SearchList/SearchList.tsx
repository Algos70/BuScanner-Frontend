import { useEffect, useState } from "react";
import SearchListContent from "../../Components/SearchListContent/SearchListContent";
import "./SearchList.css";
import PageLayout from "../LayoutComponent/Layout";
import { getTicketsForKamilKoc } from "../../Utils/APIUtils";
import { useLocation } from "react-router-dom";
import {
  FormInterface,
  KamilKocSearchResultModel,
  TripsModelKamilKoc,
} from "../../Models/models";
import { sortTripsByPriceTotal } from "../../Utils/Utils";

function SearchList() {
  const [kamilKocResponse, setKamilKocResponse] =
    useState<KamilKocSearchResultModel>({
      departureCityName: "",
      arrivalCityName: "",
      dateDay: "",
      trips: [],
    });
  const { state } = useLocation();

  const [formData, setFormData] = useState<FormInterface>(
    state.form as FormInterface
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [sortTripsByBest, setSortTripsByBest] = useState<
    "Best" | "Cheapest" | "Fastest"
  >("Best");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);


  useEffect(() => {
    // needs fixing later
    document.title = "BuScanner | Search List";

    getTicketsForKamilKoc(formData.from, formData.to, formData.date).then(
      (response) => {
        switch (sortTripsByBest) {
          case "Best": {
            const sortedTrips = sortTripsByPriceTotal(response.data.trips);
            setKamilKocResponse({ ...response.data, trips: sortedTrips });
            break;
          }
          case "Cheapest": {
            const sortedTrips = response.data.trips.sort(
              (a: TripsModelKamilKoc, b: TripsModelKamilKoc) =>
                a.pricePerPerson - b.pricePerPerson
            );
            setKamilKocResponse({ ...response.data, trips: sortedTrips });
            break;
          }
          case "Fastest": {
            const sortedTrips = response.data.trips.sort(
              (a: TripsModelKamilKoc, b: TripsModelKamilKoc) => a.hours * 60 + a.minutes - (b.hours * 60 + b.minutes)
            );
            setKamilKocResponse({ ...response.data, trips: sortedTrips });
            break;
          }
          default: {
            setKamilKocResponse(response.data);
            break;
          }
        }
      }
    ).finally(() => {
      setIsLoading(false);
    }
    );
  }, [formData, sortTripsByBest]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageLayout>
      <SearchListContent
        sortTripsByBest={sortTripsByBest}
        setSortTripsByBest={setSortTripsByBest}
        setFormData={setFormData}
        formData={formData}
        trips={kamilKocResponse.trips}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedCompanies={selectedCompanies}
        setSelectedCompanies={setSelectedCompanies}
      />
    </PageLayout>
  );
}

export default SearchList;
