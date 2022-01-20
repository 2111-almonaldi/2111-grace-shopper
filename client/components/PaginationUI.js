import React from "react";
import { Route } from "react-router-dom";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { getParam, setParam } from "../queryFunctions/queryParam";
import { DEFAULT_PAGE_SIZE} from "../../constants";

const PaginationUI = (props) => {
  const {arr, total} = props;
  const ttlPages = Math.floor( total / DEFAULT_PAGE_SIZE) + (total % DEFAULT_PAGE_SIZE < 0 ? 0 : 1)
  return (
    <Route>
      {({ location }) => {
        const pgNum = parseInt(getParam(location, "page")) || 1;
        return (
          <Pagination
            page={pgNum}
            count={ttlPages}
            renderItem={(item) => {
              const query = setParam(location, "page", item.pgNum)
              return (
                <PaginationItem
                component={Link}
                to={`${location.pathname}?${query}`}
                {...item}
              />

              )
            }}
          />
        )
      }}
    </Route>
  )
}

export default PaginationUI
