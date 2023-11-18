import React from 'react'
import './List.scss'
import Card from '../Card/Card'
import { placeholder } from '../../assets'
import { FeaturedProduct, Product } from '../FeaturedProducts/FeaturedProducts'
import useFetch from '../../hooks/useFetch'
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

  const { data, loading, error } = useFetch(
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
        : data?.map((item: Product) => <Card item={item} key={item.id} />)}
    </div>
  )
}

export default List
