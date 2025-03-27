"use client";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

import { AutoCompleteProps, callback } from "./type";
import { University } from "lucide-react";

const CustomOption = (props) => {
  const { data, innerRef, innerProps } = props;
  console.log(data.isNav, "data");
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
  ...props
}: AutoCompleteProps) => {
  const loadOptions = debounce((inputValue: string, callback: callback) => {
    if (inputValue.length >= 2 || inputValue.length === 0) {
      searchFn(inputValue).then((options) => {
        if (options)
          callback(
            options.slice(0, limit).map((option) => ({
              label: option.title,
              value: slugAsValue ? option.slug : option.id,
            }))
          );
        if (options) {
          const navOption = navLink &&  navTitle ? [{ label: navTitle, value: navLink, isNav: true }] : [];
          const mappedOptions = options.slice(0, limit).map((option) => ({
            label: option.title,
            value: slugAsValue ? option.slug : option.id,
            image: showImages ? option.avatar : undefined
          }));
          callback([...navOption, ...mappedOptions]);
        }
      });
    }
  }, 100);

  // if (creatable) {
  //   return (
  //     <AsyncCreatableSelect
  //       id={name}
  //       name={name}
  //       placeholder={placeholder}
  //       loadingMessage={({ inputValue }) =>
  //         inputValue.length < 2
  //           ? "Please type at least 2 characters"
  //           : "Loading..."
  //       }
  //       loadOptions={loadOptions}
  //       defaultValue={defaultValue as any}
  //       cacheOptions
  //       defaultOptions
  //       isMulti={acceptMultiple}
  //       isDisabled={readOnly}
  //       {...props}
  //       required={required}
  //     />
  //   );
  // }

  return (
    <AsyncSelect
      id={name}
      name={name}
      placeholder={placeholder}
      loadingMessage={({ inputValue }) =>
        inputValue.length < 2
          ? "Please type at least 2 characters"
          : "Loading..."
      }
      loadOptions={loadOptions}
      defaultValue={defaultValue as any}
      cacheOptions
      defaultOptions
      isMulti={acceptMultiple}
      isDisabled={readOnly}
      components={showImages ? { Option: CustomOption } : undefined}
      {...props}
      required={required}
    />
  );
};

export default AutoComplete;
