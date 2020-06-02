import React, {useState, useEffect} from 'react';
import axios from "axios"

export default function App() {

  const [results, setResults] = useState([])

  useEffect(() => {
    getResults()
    // axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    //   .then(res => setResults(res.data.hits))
  }, [])

  const getResults = async () => {
    const response = await axios
    .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    setResults(response.data.hits)
  }

  return(
    <React.Fragment>
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
