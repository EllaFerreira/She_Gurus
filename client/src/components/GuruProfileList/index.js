import React from "react";
import GuruProfileDeatils from "../GuruProfileDeatils/index";

export default function GuruProfileList({ matchs }) {
  return (
    <>
      {matchs.map((match) => (
        <GuruProfileDeatils
          key={match.gurus[0]._id}
          guruId={match.gurus[0]._id}
        />
      ))}
    </>
  );
}
