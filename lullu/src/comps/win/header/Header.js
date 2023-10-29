import React from 'react'
import '../../../static/win/header/header.css'
import { GrRefresh } from 'react-icons/gr'
import { getUser } from '../../../utils/Common'
function Header() {
    const user = getUser() 
  return (
    <header className='header p-2'>
        <nav className='nav d-flex flex-column p-2 justify-items-center'>
            <div className='balance'>
                <p className='avilable_balance'>Avilable Balance: &#8377; {user.balance}.00</p>
            </div>
            <div className='header_bttm d-flex justify-content-between'>
                <div className='header_bttm_links d-flex'>
                    <div className='recharge'>
                        <a className='header_link mall_link recharge_cont' href= '#'>Recharge</a>
                    </div>
                    <div className='rule'>
                        <a className='header_link mall_link rule_cont' href='#'>Read Rule</a>
                    </div>
                </div>
                <div className='header_refresh'>
                    <GrRefresh color="white" className='refresh_icon' />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header