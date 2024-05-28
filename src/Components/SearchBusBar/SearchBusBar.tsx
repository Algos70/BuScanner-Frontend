import { Stack } from "react-bootstrap";
import "./SearchBusBar.css";
import { Search } from "react-bootstrap-icons";
import Select from "../Select/Select";
import DatePickerComponent from "../Datepicker/DatepickerComponent";
import { FormInterface } from "../../Models/models";

interface SearchBusBarProps {
  provinces: string[];
  formData: FormInterface;
  setFormData: (data: FormInterface) => void;

}

function SearchBusBar(props: SearchBusBarProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="SearchBusBar-container">
      <div className="App_SearchBox">
        <div className="App_SearchBoxContainer">
          <Stack direction="horizontal" gap={5}>
            <div className="p-5 destination-container">
              <Search />
              <Select setFormData={props.setFormData} formData={props.formData} selectType="from" values={props.provinces} />
              <div>-</div>
              <Select setFormData={props.setFormData} formData={props.formData} selectType="to" values={props.provinces} />
            </div>
            <div className="ms-auto">
              <DatePickerComponent
                formData={props.formData}
                setFormData={props.setFormData}
              />
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default SearchBusBar;
