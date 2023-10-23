import React, { FC, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IMenu, ILink } from 'WNTR/interfaces'
import { Nav } from 'react-bootstrap'
import ShoppingCart from '../utils/cart-context'

const Navigation: FC<IMenu> = (menu) => {

    return(
        <Nav key={menu.alias} className="header__navigation justify-content-center flex-grow-1">
            {menu.includeHome ? <NavigationLink key="-1" url="/" title="Home" /> : null}
            {menu.links.map((link, index) =>
                link.url ? <NavigationLink key={index} {...link} /> : null
            )}
        </Nav>
    )
}

const NavigationLink: FC<ILink> = (link) => {

    const cart = useContext(ShoppingCart)
    const pathname = usePathname()
    return (
        <Nav.Item className="header__navigation-item text-right">
            <Nav.Link as={Link} scroll={true} href={link.url} className={`${pathname === link.url ? 'active' : null}`}>{link.title} {link.title == 'Cart' ? ' (' + cart.items?.length + ')' : null}</Nav.Link>
        </Nav.Item>
    )
}

export default Navigation;