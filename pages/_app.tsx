import 'WNTR/styles/index.scss'
import { useState, useEffect } from 'react'
import router from 'next/router'
import type { AppProps } from 'next/app'
import { useCookies } from 'react-cookie'
import { CookiesProvider } from 'react-cookie'
import ShoppingCart from '../utils/cart-context'
import Context from '../utils/context'
import * as Analytics from 'WNTR/utils/analytics'
import { ISessionLineItem } from 'WNTR/interfaces'

export default function App({ Component, pageProps }: AppProps) {

  // loading
  const [loading, setLoading] = useState({ loading: false })
  router.events.on("routeChangeStart", e => setLoading({ loading: true }))
  router.events.on("routeChangeComplete", e => setLoading({ loading: false }))
  
  // shopping cart & analytics
  const [cookies, setCookie, removeCookie] = useCookies(['inksane'])
  const [cart, setCart] = useState({
    items: [] as Array<ISessionLineItem>,
    add,
    remove,
    clear
  })
  useEffect(() => {
    router.events.on("routeChangeComplete", (url: URL) => Analytics.pageview(url, 'G-ZHT9M2JNLK'))
    if (cookies.inksane == undefined) {
      setCookie('inksane', [], { path: '/' })
    } else {
      if (cookies.inksane.length != cart.items.length) {
        setCart(Object.assign({}, cart, [] as Array<ISessionLineItem>))
        cookies.inksane.forEach((product: ISessionLineItem) => cart.add(product))
      }
    }
    return () => {
      router.events.off("routeChangeComplete", (url: URL) => Analytics.pageview(url, 'G-ZHT9M2JNLK'))
    }
  }, [])
  function add(item: ISessionLineItem) {
    cart.items.push(item)
    setCart(Object.assign({}, cart, cart.items))
    setCookie('inksane', cart.items, { path: '/' })
  }
  function remove(item: ISessionLineItem) {
    let index = cart.items.findIndex(d => d.product === item.product)
    cart.items.splice(index, 1)
    setCart(Object.assign({}, cart, cart.items))
    setCookie('inksane', cart.items, { path: '/' })
  }
  function clear() {
    cart.items = []
    setCart(Object.assign({}, cart, []))
    setCookie('inksane', [], { path: '/' })
  }

  return (
    <ShoppingCart.Provider value={cart}>
      <CookiesProvider>
        <Context.Provider value={loading}>
          <Component {...pageProps} />
        </Context.Provider>
      </CookiesProvider>
    </ShoppingCart.Provider>
  )
}