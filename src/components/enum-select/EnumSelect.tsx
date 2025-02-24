import { ChangeEventHandler } from "react";

interface EnumSelectProps {
    enumObject: Object,
    label: string,
    value?: any,
    onChange: (event?: any) => void;
}

const EnumSelect = ({ enumObject, label, value, onChange }: EnumSelectProps) => {
    return (
      <div>
        <label>{label}</label>
        <select className="border rounded p-2 w-full" value={value} onChange={onChange}>
          {Object.entries(enumObject).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default EnumSelect;