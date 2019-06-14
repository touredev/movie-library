import React, { useState } from "react";
import { useDataApi } from "../../hooks/dataFetchingHooks";
import {
  defaultUrl,
  searchUrl,
  loadMoreUrl
} from "../../services/movieService";
import { imageBaseUrl, backDropSize, posterSize } from "../../config.json";
import HeroImage from "../commons/HeroImage/heroImage";
import SearchBar from "../commons/SearchBar/searchBar";
import FourColGrid from "../commons/FourColGrid/fourColGrid";
import Spinner from "../commons/Spinner/spinner";
import LoadMoreBtn from "../commons/LoadMoreBtn/loadMoreBtn";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [{ data, loading }, doFetch] = useDataApi(
    defaultUrl,
    {
      movies: [],
      heroImage: null,
      currentPage: 0,
      totalPages: 0
    },
    searchTerm
  );

  const loadMoreItems = () =>
    doFetch(loadMoreUrl(data.currentPage, searchTerm));

  const searchItems = searchTerm => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);
    doFetch(searchUrl(searchTerm));
  };

  return (
    <div className="rmdb-home">
      {data.heroImage ? (
        <div>
          <HeroImage
            image={`${imageBaseUrl}/${backDropSize}/${
              data.heroImage.backdrop_path
            }`}
            title={data.heroImage.original_title}
            text={data.heroImage.overview}
          />
          <SearchBar callback={searchItems} />
        </div>
      ) : null}

      <FourColGrid />
      <Spinner />
      <LoadMoreBtn />
    </div>
  );
};

export default Home;
