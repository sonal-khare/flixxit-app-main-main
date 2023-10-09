import React, { useState } from "react";
import "../../../Styles/DashboardHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { getMoviesBySearchText } from '../../../data/moviesSlice.js';
import { useLoader } from '../../../data/hooks/useLoader'

function Header({ black }) {

    const { setLoaderSpinning, search, setSearch, searchBox, setSearchBox, showSearch, showMenu } = useLoader();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    // close the menu bar
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    // open close menu tab based on screen size
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    // focus to the button when we transitioned from open
    const prevOpen = React.useRef(openMenu);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = openMenu;
    }, [openMenu]);

    // Show/Hide search box when clicks search icon
    const toggleSearchBox = () => {
        if (searchBox) {
            setSearchBox(false);
        } else {
            setSearchBox(true);
        }
    };

    const handleAccount = () => {
        navigate("/account");
    };

    const handleSignout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    // Debouncer for search box -> wait for sometime to trigger search based on typed text
    const Debouncer = (e) => {
        setLoaderSpinning(true);
        const callGetMoviesBySearch = async () => {
            // Get all the movies based on the search text
            dispatch(getMoviesBySearchText(e));
            setLoaderSpinning(false);
        }
        callGetMoviesBySearch();
        setSearch(e);
    };

    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <header className={black ? "black" : ""}>
            <div className="nav-bar-bar">
                <div className="header-logo">
                    <Link to="/dashboard">
                        <img
                            src="/static/Images/flixxit-logo.png"
                            alt="Flixxit"
                        />
                    </Link>
                </div>
                {showMenu ?
                    <div className="nav-lg">
                        <Link
                            to="/dashboard"
                            className="nav-bar-text-1"
                        >
                            Home
                        </Link>
                        <Link to="" className="nav-bar-text">
                            TV Shows
                        </Link>
                        <Link to="" className="nav-bar-text">
                            Movies
                        </Link>
                        <Link to="" className="nav-bar-text">
                            New & Popular
                        </Link>
                        <Link to="/myList" className="nav-bar-text">
                            My List
                        </Link>
                    </div>
                    : <></>
                }
                <div>
                    <Button
                        className="nav-sm"
                        ref={anchorRef}
                        aria-controls={openMenu ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color={"secondary"}
                    >
                        Browse
                    </Button>
                    <Popper
                        open={openMenu}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom" ? "center top" : "center bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={openMenu}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>Home</MenuItem>
                                            <MenuItem onClick={handleClose}>Tv Shows</MenuItem>
                                            <MenuItem onClick={handleClose}>Movies</MenuItem>
                                            <MenuItem onClick={handleClose}>My List</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
                <div className="search-bar-right">
                    {showSearch ?
                        <div className={`${searchBox ? "searchBox" : "searchIcon"}`}>
                            <span className="icon" onClick={() => toggleSearchBox()}>
                                <FontAwesomeIcon color="white" icon={faSearch} />
                            </span>
                            <DebounceInput
                                className="searchInput"
                                minLength={2}
                                value={search}
                                placeholder="Titles, People, Genres..."
                                //onBlur={() => setSearchBox(false)}
                                debounceTimeout={1000}
                                onChange={(e) => {
                                    Debouncer(e.target.value);
                                }}
                            />
                        </div> : <></>
                    }
                    <div className="header-user">
                        <a>
                            <img
                                onClick={handleOpen}
                                src="/static/Images/profile-avatar.png"
                                alt="profile    "
                            />
                        </a>
                    </div>
                    {open && (
                        <div className="modal-box-profiles">
                            <div className="profile-text-bottom" onClick={handleAccount}>Account</div>
                            <div onClick={handleSignout} className="profile-text-bottom">
                                Sign out
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;