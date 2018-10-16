import React from 'react';

function PaymentEntry({ click, item, index }) {
  return (<li onClick={() => click(index)}>{item.todoname}    {item.todo}</li>);
}

export default PaymentEntry;
