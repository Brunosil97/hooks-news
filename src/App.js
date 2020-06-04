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
    // axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    //   .then(res => setResults(res.data.hits))
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
    <React.Fragment>
      <form onSubmit={handleSearch}>
      <input value={query} type="text" onChange={handleChange} ref={searchInputRef}/>
      <button type="submit">Search</button>
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
    </React.Fragment>
  )
}
