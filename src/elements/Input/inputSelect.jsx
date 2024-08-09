import Select from "react-select/async-creatable";
import './Input.module.css'

export default function InputSelect({
  field: {
    onChange,
    isMulti,
    options,
    loadOptions,
    loadEmpty,
    isClearable,
    name,
    disabled,
    isCreatable,
    placeholder = 'Selecione',
    isSearchable = false,
    filter,
    filterField,
    noOptionsMessage,
    handleCreate,
  },
  ...props }) {

  const loadOptionsHandler = (inputValue, callback) => {
    if (loadOptions) {
      if (isCreatable || !loadEmpty) {
        if (inputValue.length > 1) {
          loadOptions(inputValue, callback)
        } else {
          callback(null);
        }
      } else {
        loadOptions(inputValue, callback)
      }
    } else if (options) {
      callback(options)
    } else {
      callback([])
    }
  };

  return (
    <Select
      {...props}
      axis="xy"
      id={name}
      instanceId={name}
      distance={4}
      placeholder={placeholder}
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      defaultOptions={options || true}
      name={name}
      key={name}
      onCreateOption={handleCreate}
      classNamePrefix="inputSelect"
      loadOptions={loadOptionsHandler}
      isClearable={isClearable}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isDisabled={disabled}
      isValidNewOption={(inputValue) => isCreatable && inputValue.length > 2}
      formatCreateLabel={(inputValue) => inputValue}
      noOptionsMessage={() => noOptionsMessage ? noOptionsMessage : "Sem opções"}
      loadingMessage={() => "Carregando"}
      filterOption={(e) => {
        if (Array.isArray(filter)) {
          return filterField ? filter.some((item) => e.data[filterField]?.label === item.label) : true
        } else { return filterField ? filter === e.data[filterField]?.label : true }
      }}
      onChange={(value) => onChange({ target: { name, value } })}
    />
  );
};