import { FormInterface } from "../../Models/models";
import "./Select.css";

interface SelectProps {
    values: string[];
    formData: FormInterface;
    setFormData: (data: FormInterface) => void;
    selectType: "from" | "to";
}

function Select(props: SelectProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.selectType === "from")
            props.setFormData({ ...props.formData,  from: e.target.value });
        else {
            props.setFormData({ ...props.formData,  to: e.target.value });
        }
    }

    return (
        <div className="custom-select-wrapper">
            <select onChange={handleChange} className="custom-select" value={props.selectType==="from" ? props.formData.from : props.formData.to}>
                {props.values.map((value, key) => {
                    return (
                        <option key={key} value={value}>{value}</option>
                    )
                })}
            </select>
        </div>

    );
}

export default Select;