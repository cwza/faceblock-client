import React from 'react'
import Loading from './Loading'
import { isEmpty } from 'lodash'

const Private = (props) => {
  if(isEmpty(props.selfUser))
    return (<Loading />)
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Private;
