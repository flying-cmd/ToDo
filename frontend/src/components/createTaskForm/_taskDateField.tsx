import React, { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = (
  props,
): ReactElement => {
  const { 
    disabled = false,
    value = new Date(),
    onChange = (date) => console.log(date),
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Task Date"
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        disabled={disabled}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

TaskDateField.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};