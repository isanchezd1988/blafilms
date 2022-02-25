import { useEffect, useState } from 'react'

export default function homeEnhancer(Home) {
  return function (props) {
    const [searchResult, setSearchResult] = useState('')

    useEffect(() => {
      const search = async () => {
        const response = await fetch(
          'http://www.omdbapi.com/?apikey=a461e386&s=king',
        )

        const data = await response.json()

        if (!searchResult) {
          setSearchResult(data)
        }
      }

      search()
    }, [])

    return <Home {...props} searchResult={searchResult} />
  }
}
