import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import Cart from '../Cart/Cart'
import './Navbar.scss'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const products = useAppSelector(
    (cartReducer) => cartReducer.cartState.products,
  )

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="/img/en.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>SEK</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className="link" to="/products/1">
              Sortiment
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            STELLAR
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to="/">
              Hem
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Om oss
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Kontakt
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Butiker
            </Link>
          </div>
          <div className="icons">
            <SearchIcon />
            <PersonOutlineOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar
