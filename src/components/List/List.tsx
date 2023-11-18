import React from 'react'
import useFetch from '../../hooks/useFetch'
import Card from '../Card/Card'
import { Product } from '../FeaturedProducts/FeaturedProducts'
import './List.scss'
export type ListProps = {
  subCats: string[]
  maxPrice: number
  sort: null | 'asc' | 'desc'
  catId: number
}
const List: React.FC<ListProps> = ({
  subCats,
  maxPrice,
  sort = 'asc',
  catId,
}) => {
  const filterQuerySubCategory = (category: string) =>
    `&[filters][sub_categories][id][$eq]=${category}`

  const filterQueryByCategory = (catId: number) =>
    `/products?populate=*&[filters][categories][id]=${catId}`

  const filterByPrice = () =>
    `&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`

  const { data, loading, error } = useFetch<Product[]>(
    `${filterQueryByCategory(catId)}${subCats
      .map((item) => filterQuerySubCategory(item))
      .join('')}${filterByPrice()}`,
  )

  /* ${subCats.map(
    (item) => `&[filters][sub_categories][id][$eq]=${item}`,
  )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort} */
  return (
    <div className="list">
      {loading
        ? 'loading'
        : error
        ? 'Something went wrong when fetching the product data'
        : data?.map((item: Product) => <Card item={item} key={item.id} />)}
    </div>
  )
}

export default List
