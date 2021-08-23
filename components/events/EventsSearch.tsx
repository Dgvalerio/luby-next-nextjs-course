/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, FormEvent, useRef } from 'react';

import Button from '../ui/Button';
import classes from './EventsSearch.module.css';

const EventsSearch: FC<{ onSearch: any }> = ({ onSearch }) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!yearInputRef.current || !monthInputRef.current) return;

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = yearInputRef.current.value;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button onClick={submitHandler}>Find Button</Button>
    </form>
  );
};

export default EventsSearch;
