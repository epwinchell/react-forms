import React, { useState, useEffect } from 'react';
import PropTypes, { bool } from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import fnToString from '@data-driven-forms/common/src/utils/fn-to-string';

import { Select as CarbonSelect, MultiSelect, SelectItem } from 'carbon-components-react';
import prepareProps from '../common/prepare-props';

export const multiOnChange = (input, simpleValue) => ({ selectedItems }) => {
  if (simpleValue) {
    return input.onChange(selectedItems.map(({ value }) => value));
  } else {
    return input.onChange(selectedItems);
  }
};

const ClearedMultiSelectFilterable = ({
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  isMulti,
  classNamePrefix,
  closeMenuOnSelect,
  onChange,
  originalOnChange,
  carbonLabel,
  placeholder,
  isDisabled,
  ...rest
}) => (
  <MultiSelect.Filterable
    disabled={isDisabled}
    {...rest}
    placeholder={carbonLabel || placeholder}
    onChange={originalOnChange}
    titleText={rest.labelText}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
    items={options}
    initialSelectedItems={Array.isArray(rest.value) ? rest.value : []}
  />
);

ClearedMultiSelectFilterable.propTypes = {
  invalidText: PropTypes.node,
  hideSelectedOptions: PropTypes.any,
  noOptionsMessage: PropTypes.any,
  onInputChange: PropTypes.func,
  options: PropTypes.array,
  isFetching: PropTypes.bool,
  invalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  isMulti: PropTypes.bool,
  classNamePrefix: PropTypes.any,
  closeMenuOnSelect: PropTypes.any,
  onChange: PropTypes.func,
  originalOnChange: PropTypes.func,
  carbonLabel: PropTypes.node,
  placeholder: PropTypes.node,
  isDisabled: PropTypes.bool
};

const ClearedMultiSelect = ({
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  isMulti,
  classNamePrefix,
  closeMenuOnSelect,
  onChange,
  originalOnChange,
  carbonLabel,
  placeholder,
  isDisabled,
  ...rest
}) => (
  <MultiSelect
    disabled={isDisabled}
    {...rest}
    label={carbonLabel || placeholder}
    onChange={originalOnChange}
    titleText={rest.labelText}
    id={rest.name}
    invalid={Boolean(invalidText)}
    invalidText={invalidText}
    items={options}
    initialSelectedItems={Array.isArray(rest.value) ? rest.value : []}
  />
);

ClearedMultiSelect.propTypes = {
  invalidText: PropTypes.node,
  hideSelectedOptions: PropTypes.any,
  noOptionsMessage: PropTypes.any,
  onInputChange: PropTypes.func,
  options: PropTypes.array,
  isFetching: PropTypes.bool,
  invalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  isMulti: PropTypes.bool,
  classNamePrefix: PropTypes.any,
  closeMenuOnSelect: PropTypes.any,
  onChange: PropTypes.func,
  originalOnChange: PropTypes.func,
  carbonLabel: PropTypes.node,
  placeholder: PropTypes.node,
  isDisabled: PropTypes.bool
};

const ClearedSelect = ({
  isSearchable,
  isClearable,
  isDisabled,
  isMulti,
  invalidText,
  hideSelectedOptions,
  noOptionsMessage,
  onInputChange,
  options,
  isFetching,
  invalid,
  classNamePrefix,
  closeMenuOnSelect,
  originalOnChange,
  placeholder,
  ...rest
}) => (
  <CarbonSelect disabled={isFetching} {...rest} id={rest.name} invalid={Boolean(invalidText)} invalidText={invalidText}>
    {isFetching && <SelectItem text={placeholder} value={''} />}
    {options.map((option, index) => (
      <SelectItem key={option.value || index} text={option.label} {...option} />
    ))}
  </CarbonSelect>
);

ClearedSelect.propTypes = {
  invalidText: PropTypes.node,
  hideSelectedOptions: PropTypes.any,
  noOptionsMessage: PropTypes.any,
  onInputChange: PropTypes.func,
  options: PropTypes.array,
  isFetching: PropTypes.bool,
  invalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  isMulti: PropTypes.bool,
  classNamePrefix: PropTypes.any,
  closeMenuOnSelect: PropTypes.any,
  onChange: PropTypes.func,
  originalOnChange: PropTypes.func,
  carbonLabel: PropTypes.node,
  placeholder: PropTypes.node,
  isDisabled: PropTypes.bool,
  isSearchable: bool,
  isClearable: bool
};

const Select = (props) => {
  const { isMulti, isSearchable, loadOptions, input, meta, validateOnMount, ...rest } = useFieldApi(prepareProps(props));

  const [loadOptionsChangeCounter, setCounter] = useState(0);

  const loadOptionsStr = fnToString(loadOptions);

  useEffect(() => {
    setCounter(loadOptionsChangeCounter + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOptionsStr]);

  const Component = isMulti && isSearchable ? ClearedMultiSelectFilterable : isMulti ? ClearedMultiSelect : ClearedSelect;

  const invalidText = ((meta.touched || validateOnMount) && meta.error) || '';

  return (
    <DataDrivenSelect
      SelectComponent={Component}
      simpleValue={false}
      {...rest}
      {...input}
      loadOptions={loadOptions}
      invalidText={invalidText}
      loadOptionsChangeCounter={loadOptionsChangeCounter}
      originalOnChange={multiOnChange(input, rest.simpleValue)}
    />
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node
    })
  )
};

Select.defaultProps = {
  loadingMessage: 'Loading...'
};

export default Select;
