import {
  useState,
  useReducer,
  useEffect
} from "react";
import {
  fetchItems
} from "../services/movieService";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state, loading: true
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
          data: action.payload
      };
    case "INIT_SEARCH":
      return {
        ...state,
        loading: false,
          data: {
            ...state.data,
            movies: []
          }
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData, query = "") => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    data: initialData
  });

  useEffect(() => {
    const fetchData = async () => {
      query === "" ?
        dispatch({
          type: "INIT"
        }) :
        dispatch({
          type: "INIT_SEARCH"
        });

      try {
        const apiData = await fetchItems(url, state.data);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: apiData
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
};

export {
  useDataApi
};