import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatepickerComponent.css";
import { CaretRightFill, CaretLeftFill } from "react-bootstrap-icons";
import { FormInterface } from "../../Models/models";

interface DatepickerComponentProps {
  formData: FormInterface;
  setFormData: (data: FormInterface) => void;
}

const DatepickerComponent = (props: DatepickerComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handeClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    props.setFormData({ ...props.formData, date: date.toISOString().split("T")[0] });
    setIsDatePickerOpen(false);
  };

  const handleRightArrowClick = () => {
    const newDate = new Date(selectedDate.setDate(selectedDate.getDate() + 1));
    setSelectedDate(newDate);
    props.setFormData({ ...props.formData, date: newDate.toISOString().split("T")[0] });
  };

  const handleLeftArrowClick = () => {
    const newDate = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
    setSelectedDate(newDate);
    props.setFormData({ ...props.formData, date: newDate.toISOString().split("T")[0] });
  };

  const parseDateStringToDate = (dateString: string) : Date | string => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month in JavaScript Date object is 0-indexed
  };

  useEffect(() => {
    if (parseDateStringToDate(props.formData.date) !== undefined || parseDateStringToDate(props.formData.date) !== null || parseDateStringToDate(props.formData.date) !== "Invalid Date") {
      setSelectedDate(parseDateStringToDate(props.formData.date) as Date);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="datepicker-container">
      <div className="arrows">
        <div onClick={handleLeftArrowClick} className="left-arrow">
          <CaretLeftFill />
        </div>
        <div onClick={handeClick} className="placeHolder">
          {selectedDate.toDateString()}
        </div>
        <div onClick={handleRightArrowClick} className="right-arrow">
          <CaretRightFill />
        </div>
      </div>
      <DatePicker
        open={isDatePickerOpen}
        onChange={handleDateChange}
        onClickOutside={() => setIsDatePickerOpen(false)}
        className="custom-datepicker"
        readOnly
      />
    </div>
  );
};

export default DatepickerComponent;
