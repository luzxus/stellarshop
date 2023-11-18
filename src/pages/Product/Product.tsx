import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import BalanceIcon from '@mui/icons-material/Balance'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Product.scss'

import { placeholder } from '../../assets'
import { ApiProductProduct } from '../../constants'
import { useAppDispatch } from '../../hooks/reduxHooks'
import useFetch from '../../hooks/useFetch'
import { addToCart } from '../../redux/cartReducer'
export type Attributes = {
  isNew: boolean
  desc: string
  title: string
  price: number
}
export type ProductItem = {
  id: number
  img: string
  oldPrice: number
  price: number
  title: string
  attributes: Attributes
}
const Product = () => {
  const id = useParams().id
  const [selectedImg, setSelectedImg] = useState('img')
  const [quantity, setQuantity] = useState(1)

  const { data, loading, error } = useFetch<ApiProductProduct>(
    `/products/${id}?populate=*`,
  )
  console.log('data product', data)

  const dispatch = useAppDispatch()
  return (
    <div className="product">
      {loading ? (
        'loading'
      ) : error ? (
        'Something Went wrong'
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  import.meta.env.VITE_API_UPLOAD_URL +
                  data?.attributes.img.data.attributes.url
                }
                alt=""
                onClick={() => setSelectedImg('img')}
              />
              <img
                src={
                  import.meta.env.VITE_API_UPLOAD_URL +
                  data?.attributes?.img2?.data?.attributes?.url
                }
                alt=""
                onClick={() => setSelectedImg('img2')}
              />
            </div>
            <div className="mainImg">
              <img
                src={
                  import.meta.env.VITE_API_UPLOAD_URL +
                  data?.attributes[selectedImg]?.data.attributes.url
                }
                alt={placeholder}
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">SEK {data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: +id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img:
                      import.meta.env.VITE_API_UPLOAD_URL + data.attributes.img,
                    quantity,
                  }),
                )
              }
            >
              <AddShoppingCartIcon /> LÄGG TILL I VARUKORG
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> LÄGG TILL I ÖNSKELISTA
              </div>
              <div className="item">
                <BalanceIcon /> JÄMFÖR
              </div>
            </div>
            <div className="info">
              <span>Utgivare: BONNIER</span>
              <span>Produkt typ: Bok</span>
              <span>Tag: Bok</span>
            </div>
            <hr />
            <div className="info">
              <span>BESKRIVNING</span>
              <hr />
              <span>ÖVRIG INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Product

/*   const data: ProductItem = {
    id: 1,
    img: book,
    oldPrice: 12,
    price: 10,
    title: 'Book of PI',
    attributes: {
      isNew: false,
      price: 130,
      title: 'Book of PI',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea corrupti corporis voluptates esse maiores maxime. Corporis, minus. Distinctio id sequi error vero deserunt vitae praesentium, tempore sit cumque quisquam nemo.',
    },
  } */
