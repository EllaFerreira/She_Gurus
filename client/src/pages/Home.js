import React from "react";
import { useQuery } from "@apollo/client";
import { Profile } from "../components/Profile/index";
import { Loader } from "../components/Loader/index";
import { GET_GURUS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_GURUS);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <Loader />
          ) : (
            <Profile profiles={profiles} title="Here are the gurus..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
