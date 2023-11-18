import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import List from '../../components/List/List'
import './Products.scss'
import useFetch from '../../hooks/useFetch'

export type Product = {
  id: string
  attributes: { title: string }
}

const Products = () => {
  const productId = useParams().id ?? '1'
  const catId = parseInt(productId)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState<null | 'desc' | 'asc'>('asc')
  const [selectedSubCats, setSelectedSubCats] = useState<any>([])

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const value = e.target.value
    const isChecked = e.target.checked

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item: any) => item !== value),
    )
  }
  console.log('data', data)

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {error ? (
            <div>Something Went Wrong!</div>
          ) : (
            <>
              {!loading &&
                data?.map((item: Product) => (
                  <div className="inputItem" key={item.id}>
                    <input
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      onChange={handleChange}
                    />
                    <label htmlFor={item.id}>{item.attributes.title}</label>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              checked={sort === 'asc'}
              onChange={() => setSort('asc')}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              checked={sort === 'desc'}
              name="price"
              onChange={() => setSort('desc')}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  )
}

export default Products
