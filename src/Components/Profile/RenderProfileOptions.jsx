import History from './History'
import Payments from './Payments'
import Refer from './Refer'
import Favorites from './Favorites'
import Address from './Address'
import User from './User'
import { useEffect } from 'react'
import axios from 'axios'

const RenderProfileOptions = ({optionSelected}) => {
    let render;
    
    switch (optionSelected) {
        case 'Address':
            render = <Address/>
            break;
        case 'Profile':
            render = <User/>
            break;
        case 'Favorites':
            render = <Favorites/>
            break;
        case ' History':
            render = <History/>
            break;
        case 'Referrals':
            render = <Refer/>
            break;
        default: render = <User />
            break;
    }

  return (
    <div className='profile-options'>
       {render}
    </div>
  )
}

export default RenderProfileOptions