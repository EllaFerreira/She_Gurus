import React from "react";
import { useQuery } from "@apollo/client";
import Profile from "../Profile/index";
import ContentLoader from "../Loader/index";
import { MATCH_GURUS } from "../../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(MATCH_GURUS);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <ContentLoader />
          ) : (
            <Profile profiles={profiles} title="Here are the gurus..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
