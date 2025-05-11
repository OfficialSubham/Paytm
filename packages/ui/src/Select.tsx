"use client"

export const Select = ({ options, onSelect }: {
  options: {
    key: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
}) => {
  return (
    <select onChange={(e) => {
      onSelect(e.target.value)

    }} className="w-full bg-white h-8 rounded-md border px-2">
      {options.map((option) => {
        return <option value={option.key} key={option.key}>{option.value}</option>
      })}
    </select>
  )
}

