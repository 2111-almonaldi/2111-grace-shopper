import React, { useEffect } from 'react'
import {connect, useDispatch} from 'react-redux'
import {loadProducts} from "../store/products"
/**
 * COMPONENT
 */
export const Home = props => {
  const {username, firstName} = props
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(loadProducts())
  // })
  return (
    <div>
      <h3>Welcome, {firstName}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.auth.firstName
  }
}

export default connect(mapState)(Home)
