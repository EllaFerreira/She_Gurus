import React from "react";
import GuruProfileDetails from "../GuruProfileDetails/index";

export default function GuruProfileList({ matchs }) {
  return (
    <>
      {matchs.map((match) => (
        <GuruProfileDetails
          key={match.gurus[0]._id}
          guruId={match.gurus[0]._id}
        />
      ))}
    </>
  );
}
