import { createContext, useState } from 'react'

const SearchContext = createContext()

function SearchContextProvider(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("_id");
  const [filter, setFilter] = useState({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const resetFashion = () => {
    setFilter({})
    setOffset(0)
    setSort("_id")
    setCurrentPage(1)
  }

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      sort,
      setSort,
      filter,
      setFilter,
      offset,
      setOffset,
      limit,
      setLimit,
      currentPage,
      setCurrentPage,
      resetFashion
    }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContext
export { SearchContextProvider }
