import React, {useState, useEffect, useRef} from 'react';
import "./app.css"
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
      .get(`https://hn.algolia.com/api/v1/search?query=${query}`);
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
      <h1 id="h1" >Hook News</h1>
      <form className="mb-2"
        onSubmit={handleSearch}>
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          value={query} 
          type="text" 
          onChange={handleChange} 
          ref={searchInputRef}/>
        <button type="submit" 
        className="bg-orange rounded m-1 p-1">Search | </button>
        <button type="button" 
          onClick={handleClearSearch}>| Clear</button>
      </form>
      {loading ? 
      <div>Loading Results...</div> 
        : <ol> 
          {results.map(res => {
            return <li id="li" key={res.objectID}>
              <a href={res.url}>{res.title}</a>
            </li>
          })}
        </ol>}
      {error ? <div>{error.message}</div> : null}
    </div>
  )
}

