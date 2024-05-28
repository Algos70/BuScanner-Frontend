import "./CheckBox.css";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface CheckBoxProps {
  companyName: string;
  index: number;
  selectedCompanies: string[];
  setSelectedCompanies: (value: string[]) => void;
}

function CheckBox({
  index,
  companyName,
  setSelectedCompanies,
  selectedCompanies,
}: CheckBoxProps) {
  const isChecked = () => {
    return selectedCompanies.includes(companyName);
  };
  const [checked, setChecked] = useState<boolean>(isChecked);

  const handleChange = () => {
    const updatedSelectedCompanies = [...selectedCompanies];

    if (checked) {
      // If the checkbox is checked, remove the companyName from the array
      const indexToRemove = updatedSelectedCompanies.indexOf(companyName);
      if (indexToRemove !== -1) {
        updatedSelectedCompanies.splice(indexToRemove, 1);
      }
    } else {
      // If the checkbox is unchecked, add the companyName to the array
      updatedSelectedCompanies.push(companyName);
    }
    setChecked(!checked);
    setSelectedCompanies(updatedSelectedCompanies);
  };

  return (
    <FormControlLabel
      id={`default-checkbox`}
      key={index}
      control={
        <Checkbox
          onChange={handleChange}
          id={`default-checkbox`}
          key={index}
          checked={checked}
          size="small"
        />
      }
      label={companyName}
    />
  );
}

export default CheckBox;
