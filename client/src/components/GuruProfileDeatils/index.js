import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { TUTOR_BY_ID } from "../../utils/queries";
import { Loader } from "../Loader/index";

export default function GuruProfileDeatils(props) {
  const guruId = props.guruId;

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { guruId: guruId },
  });

  const guru = data?.guru || {};

  if (loading) {
    return <div>{Loader}</div>;
  }

  return (
    <div className="col">
      <Card className="Card" style={{ width: "13rem" }}>
        <Card.Img variant="top" src={guru.photo} />
        <Card.Body>
          <Card.Title>{guru.surname}</Card.Title>
          <Card.Text>{tutor.skills}</Card.Text>
          <Link className="btn btn-sm btn-warning" to={`/profile/${guru._id}`}>
            Guru Profile
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
