import './Card.scss'
import { Link } from 'react-router-dom'
import { Product } from '../FeaturedProducts/FeaturedProducts'
export type CardProps = {
  item: Product
}
const Card: React.FC<CardProps> = ({ item }) => {
  console.log('item', item)
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New</span>}
          <img
            src={
              import.meta.env.VITE_API_UPLOAD_URL +
              item.attributes.img.data.attributes.url
            }
            alt=""
            className="mainImg"
          />
          {/*      <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />  */}
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>${item.attributes.oldPrice || item?.attributes.price + 20}</h3>
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  )
}

export default Card
