import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from './auth'
import avatar from './images/avatar.png'
import { NewRestaurant } from './pages/NewRestaurant'
import { Restaurant } from './pages/Restaurant'
import { Restaurants } from './pages/Restaurants'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

export function App() {
  const user = getUser()

  return (
    <>
      <header>
        <ul>
          <li>
            <nav>{isLoggedIn() ? <LoggedInNav /> : <SignedOutNav />}</nav>
          </li>
          {isLoggedIn() ? (
            <li className="avatar">
              <img src={avatar} alt={user.fullName} height="64" width="64" />
            </li>
          ) : null}
        </ul>
      </header>
      <Switch>
        <Route exact path="/">
          <Restaurants />
        </Route>
        <Route exact path="/new">
          <NewRestaurant />
        </Route>
        <Route exact path="/restaurants/:id">
          <Restaurant />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
    </>
  )
}

function LoggedInNav() {
  const user = getUser()

  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  return (
    <>
      <Link to="/new">
        <i className="fa fa-plus"></i> Restaurant
      </Link>
      <a
        href="/"
        className="link"
        onClick={function (event) {
          event.preventDefault()
          handleLogout()
        }}
      >
        Sign out
      </a>
      <p>Welcome back, {user.fullName}!</p>
    </>
  )
}

function SignedOutNav() {
  return (
    <>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}
