import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { removeItem, resetCart } from '../../redux/cartReducer'
import './Cart.scss'

import { loadStripe } from '@stripe/stripe-js'
import { makeRequest } from '../../makeRequest'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export type CartItem = {
  id: number
  img: string
  desc: string
  quantity: number
  price: number
  title: string
}
const Cart = () => {
  const totalPrice = () => {
    let total = 0
    products.forEach((pro) => (total += pro.price * pro.quantity))
    return total.toFixed(2)
  }
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLISH_KEY)

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise
      //det är i denna post requesten vi skulle kunna skicka in customer info men vi kommer använda stripe dashboard så vi behöver inte lagra detta
      const res = await makeRequest.post('/orders', { products })
      //vi refererar till det vi returnerar från vår order.js controller i backend mappen
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      })
    } catch (err) {
      console.log(err)
    }
  }
  const products = useAppSelector((state) => state.cartState.products)
  const dispatch = useAppDispatch()
  const removeCartItem = (id: number) => {
    dispatch(removeItem(id))
  }

  const resetCartState = () => {
    dispatch(resetCart())
  }
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => removeCartItem(item.id)}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={resetCartState}>
        Reset Cart
      </span>
    </div>
  )
}

export default Cart
