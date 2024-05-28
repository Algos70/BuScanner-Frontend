import { useEffect, useState } from "react";
import "./BestValueCard.css";

interface BestValueCardProps {
  value: number;
  header: string;
  time: number;
  clickedCardName: string;
  setClickedCardName: (value: string) => void;
}

function BestValueCard(props: BestValueCardProps) {
  const [theme, setTheme] = useState({
    backgroundColor: "white",
    color: "#0772E4",
  });

  const handleClick = () => {
    props.setClickedCardName(props.header);
  };

  useEffect(() => {
    if (props.clickedCardName === props.header) {
      setTheme({
        backgroundColor: "#0772E4",
        color: "white",
      });
    } else {
      setTheme({
        backgroundColor: "white",
        color: "#0772E4",
      });
    }
  }, [props.clickedCardName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="value-card" style={theme} onClick={handleClick}>
      <h6>{props.header}</h6>
      <h6 style={{ fontSize: "1.5rem" }}>{props.value} TRY</h6>

      <h6>{props.time} hour(s) (average)</h6>
    </div>
  );
}

export default BestValueCard;
