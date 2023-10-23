import React, { FC, useState } from 'react'
import { IWebsite } from 'WNTR/interfaces'
import { Navigation } from 'WNTR/components'
import { Container, Navbar, Offcanvas } from 'react-bootstrap';

const Header: FC<IWebsite> = (website) => {

    let menu = website.menus.filter(m => m.title === "Main Menu")[0]
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <header className="header fixed-top">
            {menu !== undefined ?
                <Navbar expand="lg" className="header__navbar bg-body-tertiary" fixed="top">
                    <Container>
                        <Navbar.Brand className="header__branding d-sm-none">
                            <p className="text-white my-auto">Call <a href="tel:${website.settings.phone}" className="text-white text-decoration-none">{website.settings.phone}</a></p>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="ms-auto" onClick={handleShow} />
                        <Navbar.Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar-expand-lg" placement="end">
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body onClick={handleClose}>
                                <Navigation {...menu} />
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            : null}
        </header>
    )
}

export default Header