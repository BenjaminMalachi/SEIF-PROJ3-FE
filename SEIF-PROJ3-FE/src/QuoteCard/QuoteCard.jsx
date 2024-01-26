import React, { useEffect, useState } from "react";

function QuoteCard(props) {
  const { quote } = props;

  return (
    quote && (
      <div className="my-8 card bordered shadow-lg bg-accent">
        <div className="card-body">
          <p className="text-2xl font-bold">{props.quote}</p>
        </div>
      </div>
    )
  );
}

export default QuoteCard;
