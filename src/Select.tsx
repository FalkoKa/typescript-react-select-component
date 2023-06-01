import { useState } from 'react';
import styles from './select.module.css';

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [dropdown, setDropdown] = useState<boolean>(false);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((opt) => opt !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  const isSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : value === option;
  };

  return (
    <>
      <div
        onBlur={() => setDropdown(false)}
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((val) => (
                <button
                  key={val.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(val);
                  }}
                  className={styles['option-badge']}
                >
                  {val.label} <span>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className={styles['clear-btn']}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${dropdown ? styles.show : ''}`}>
          {options.map((option) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setDropdown(false);
              }}
              key={option.label}
              className={`${styles.option} ${
                isSelected(option) ? styles.selected : ''
              } `}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
