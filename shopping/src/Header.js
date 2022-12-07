import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto navbar_format">
                    {
                        localStorage.getItem('user-info') ?
                            <>
                                <Link to="/">View Items</Link>
                                <Link to="/add">Add Item</Link>
                                <Link to="/profile">User Profile</Link>
                                <Link to="/logout">Logout</Link>
                            </> :
                            <>
                                <Link to="/login">Log In</Link>
                                <Link to="/newUser">New Account</Link>
                            </>
                    }
                </Nav>
                <Nav className='display_username'>
                    {
                        localStorage.getItem('user-info') ?
                            <>
                                Logged in as: {(JSON.parse(localStorage.getItem('user-info'))).username} <br />
                                Account balance: ${(JSON.parse(localStorage.getItem('user-info'))).money}

                            </> :
                            <>
                            </>
                    }

                </Nav>
            </Navbar>
        </div>
    )

}

export default Header;