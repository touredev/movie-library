import http from "./httpService";
import {
  apiUrl,
  apiKey
} from "../config.json";

const baseUrl = `https://cors-anywhere.herokuapp.com/${apiUrl}`;

const defaultUrl = `${baseUrl}/movie/popular/?api_key=${apiKey}&language=en-US&page=1`;

function searchUrl(searchTerm) {
  if (searchTerm === "") {
    return `${baseUrl}/movie/popular/?api_key=${apiKey}&language=en-US&page=1`;
  } else {
    return `${baseUrl}/search/movie/?api_key=${apiKey}&language=en-US&query=${searchTerm}`;
  }
}

function loadMoreUrl(currentPage, searchTerm) {
  let endPoint = `${baseUrl}/movie/popular/?api_key=${apiKey}&language=en-US&page=${currentPage +
      1}`;

  if (searchTerm !== "") endPoint += `&query=${searchTerm}`;

  return endPoint;
}

async function fetchItems(url, currentData) {
  const result = await http.get(url);
  const apiData = result.data;
  return {
    movies: [...currentData.movies, ...apiData.results],
    heroImage: currentData.heroImage || apiData.results[0],
    currentPage: apiData.page,
    totalPages: apiData.total_pages
  };
}

export {
  defaultUrl,
  searchUrl,
  loadMoreUrl,
  fetchItems
}