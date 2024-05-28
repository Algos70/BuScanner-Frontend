import "./CardList.css";
import BestValueCard from "../BestValueCard/BestValueCard";
import { useEffect, useState } from "react";

interface CardListProps {
  values: { value: number; header: string; time: number }[];
  sortTripsByBest: string;
  setSortTripsByBest: (value: "Best" | "Cheapest" | "Fastest") => void;
  setIsLoading: (value: boolean) => void;
}
function CardList(props: CardListProps) {
  const [clickedCardName, setClickedCardName] = useState<string>("Best");

  useEffect(() => {
    props.setIsLoading(true);
    props.setSortTripsByBest(
      clickedCardName as "Best" | "Cheapest" | "Fastest"
    );

  }, [clickedCardName]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App_Best_Cheapest_Card">
      <div className="App_Best_Cheapest_CardContainer">
        {props.values.map((cardValue, key) => {
          return (
            <BestValueCard
              key={key}
              clickedCardName={clickedCardName}
              setClickedCardName={setClickedCardName}
              value={cardValue.value}
              header={cardValue.header}
              time={cardValue.time}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardList;
