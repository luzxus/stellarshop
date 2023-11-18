import React from 'react'

import useFetch from '../../hooks/useFetch'
import Card from '../Card/Card'
import './FeaturedProducts.scss'

export interface Product {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  desc: string
  price: number
  oldPrice: number
  isNew: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: any
  createdAt: string
  updatedAt: string
  publishedAt: string
  type: string
}

export type FeaturedProductProps = {
  type: string
}

const FeaturedProducts: React.FC<FeaturedProductProps> = ({ type }) => {
  const { data, loading, error } = useFetch<Product[]>(
    `/products?populate=*&[filters][type][$eq]=${type}`,
  )

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {error
          ? 'Something went wrong!'
          : loading
          ? 'loading'
          : data && data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  )
}

export default FeaturedProducts

/*
const data: FeaturedProduct[] = [
  {
    id: 1,
    img: placeholder,
    oldPrice: 12,
    price: 10,
    title: 'New Product',
    attributes: { isNew: false, price: 13, title: 'Placeholder Product' },
  },
  {
    id: 2,
    img: placeholder,
    oldPrice: 12,
    price: 10,
    title: 'New Product',
    attributes: { isNew: false, price: 13, title: 'Placeholder Product' },
  },
  {
    id: 3,
    img: placeholder,
    oldPrice: 12,
    price: 10,
    title: 'New Product',
    attributes: { isNew: false, price: 13, title: 'Placeholder Product' },
  },
]
*/
