import React, {useState, useEffect} from 'react';
import axios from "axios"

export default function App() {

  const [results, setResults] = useState([])
  const [query, setQuery] = useState("react hooks")

  useEffect(() => {
    getResults()
    // axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    //   .then(res => setResults(res.data.hits))
  }, [])

  const getResults = async () => {
    const response = await axios
    .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    setResults(response.data.hits)
  }

  const handleChange = event => {
    setQuery(event.target.value)
  }

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  return(
    <React.Fragment>
      <form onSubmit={handleSearch}>
      <input value={query} type="text" onChange={handleChange}/>
      <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(res => {
          return <li key={res.objectID}>
            <a href={res.url}>{res.title}</a>
          </li>
        })}
      </ul>
    </React.Fragment>
  )
}
