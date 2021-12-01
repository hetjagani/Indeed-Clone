/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Salaries from '../snapshot/Salaries';

function SalariesMain(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <Salaries
        companyName={props.companyName}
        showButton
        salaries={props.salaries}
        flag
        compId={props.compId}
        getSalaryDetails={props.getSalaryDetails}
      />
    </div>
  );
}

export default SalariesMain;
