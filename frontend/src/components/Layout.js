import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../layout.css'
import NavBar from './navbar'

const Layout = ({children}) => {
    const {user} = useSelector((state)=>state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const AdminMenu = [
        {
            name:"Suppliers Management ",
            path:'/supplier_add',

        },
        {
            name:"Procument reqest Add",
            path:"/procument_req"
        },
        {
            name:"Item management",
            path:"/itemadd"
        },
       
        {
            name:"Procument request Management",
            path:"/procument_dash"
        },{
            name:"Sites Management ",
            path:"/sites"
        }

    ]

    const userMenu = [
        {
            name:"Order requets",
            path:'/supplierpro',

        },
        

    ]


    const menueToBeRender = user?.isAdmin ? AdminMenu :userMenu
    

    return (
        <>
        <NavBar/>
        <div className='main p-2'>

            <div className={`d-flex menu-item`} onClick={()=>{
                localStorage.clear()
                navigate('/login')
            }}>

            </div>
            
            <div className='d-flex layout'>
           
                <div className='sidebar'>
            
                    <div className='menue'>
                        {menueToBeRender.map((menu)=>{
                            const isActive=location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        })}
                    </div>
                        
                </div>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

export default Layout