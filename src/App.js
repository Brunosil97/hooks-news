import React, {useState, useEffect, useRef} from 'react';
import axios from "axios"

export default function App() {

  const [results, setResults] = useState([])
  const [query, setQuery] = useState("react hooks")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios
      .get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  const handleChange = event => {
    setQuery(event.target.value)
  }

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus()
  }

  return(
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c"  alt="React Logo" className="float-right h-12"/>
      <h1 className="text-grey-darkest font-thin">Hook News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input value={query} type="text" onChange={handleChange} ref={searchInputRef}/>
        <button type="submit" className="bg-orange rounded m-1 p-1">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      {loading ? 
      <div>Loading Results...</div> 
      : <ul> 
        {results.map(res => {
          return <li key={res.objectID}>
            <a href={res.url}>{res.title}</a>
          </li>
        })}
      </ul>}
      {error ? <div>{error.message}</div> : null}
    </div>
  )
}

