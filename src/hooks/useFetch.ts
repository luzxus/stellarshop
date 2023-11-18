import { useState, useEffect } from 'react'
import { makeRequest } from '../makeRequest'
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await makeRequest.get(url)
        setData(res.data.data)
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])

  return { data, error, loading }
}

export default useFetch
