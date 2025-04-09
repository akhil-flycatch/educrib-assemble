"use client";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";

import { AutoCompleteProps, callback } from "./type";
import { University } from "lucide-react";

const CustomOption = (props:any) => {
  const { data, innerRef, innerProps } = props;
  return (
    data.isNav ?
    <a href={data?.value}> 
    <div ref={innerRef} {...innerProps} style={{ display: "flex", alignItems: "center", padding: "20px", gap: "10px" }}>
      <div className="w-[50px] h-[50px] bg-[#EFEAFF] rounded-[6px] flex items-center justify-center">
      <University className="text-[#6129FE] text-[18px]" size={28} />

      </div>
      <p className="text-[#6129FE] text-[18px]">{data?.label}</p>
    </div></a> :
    <div ref={innerRef} {...innerProps} style={{ display: "flex", alignItems: "center", padding: "20px" }}>
      {data.image && <img className="w-[50px] h-[50px] object-cover mr-[40px]" src={data.image} alt={data.label} />}
      <span className="text-[16px] font-[]">{data.label}</span>
    </div>
  );
};

// const CustomOptionWithIcon = 
const AutoComplete = ({
  defaultValue,
  searchFn,
  limit = 10,
  name,
  placeholder,
  slugAsValue = false,
  acceptMultiple = false,
  readOnly = false,
  required = false,
  creatable = false,
  showImages = false,
  navLink,
  navComponent,
  navTitle,
  onSelect, // Added onSelect prop to notify parent about selected item
  selectedOptions = [], // Add selectedOptions prop to filter out selected options
  ...props
}: AutoCompleteProps) => {
  const loadOptions = debounce((inputValue: string, callback: callback) => {
    
    if (inputValue.length >= 2 || inputValue.length === 0) {
      searchFn(inputValue).then((options) => {
        if (options) {
          // Filter out the selected options
          const filteredOptions = options
            .slice(0, limit)
            .filter((option) => {
              return !selectedOptions.some(
                (selected:any) => selected.value === option.id || selected.value === option.slug
              );
            });

          const navOption = navLink && navTitle ? [{ label: navTitle, value: navLink, isNav: true }] : [];
          const mappedOptions = filteredOptions.map((option) => ({
            label: option.title,
            value: slugAsValue ? option.slug : option.id,
            image: showImages ? (option.avatar ? option.avatar : option.icon) : undefined,
          }));
          callback([...navOption, ...mappedOptions]);
        }
      });
    }
  }, 100);

  const handleChange = (selectedOption: any) => {
    if (onSelect) {
      onSelect(selectedOption); // Call onSelect function passed from the parent
    }
  };

  const customStyles = {
    control: (provided: any, state: { isFocused: any; }) => ({
      ...provided,
      border: state.isFocused ? "2px solid #0A2B5D" : "1px solid #C5C5C5",
      borderRadius: "8px",
      //padding: "8px",
      height: "60px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#0A2B5D",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      position: "absolute",
      //top: "14px",
      left: "12px",
      fontSize: "14px",
      color: "#777",
      transition: "0.2s",
    }),
    input: (provided: any) => ({
      ...provided,
     //marginTop: "16px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      marginTop: "14px",
    }),
  };

  return (
    <AsyncSelect
      id={name}
      name={name}
      styles={customStyles}
      placeholder={placeholder}
      loadingMessage={({ inputValue }) =>
        inputValue.length < 2 ? "Please type at least 2 characters" : "Loading..."
      }
      loadOptions={loadOptions}
      defaultValue={defaultValue as any}
      cacheOptions
      defaultOptions
      isMulti={acceptMultiple}
      isDisabled={readOnly}
      components={showImages ? { Option: CustomOption } : undefined}
      onChange={handleChange} // Use onChange to trigger the parent function
      {...props}
      required={required}
    />
  );
};


export default AutoComplete;
