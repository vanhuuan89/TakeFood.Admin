import React from 'react'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoOrange from '../../../../assets/images/LogoOrange.png'
import '../../../../css/header.css'

import { NavLink } from 'react-router-dom';
import { LunchDining, Info, ListAlt, Discount, AutoGraph, Person, Store, AdminPanelSettings, AirplaneTicket, GifBox } from '@mui/icons-material';

const Sidebar = () => {
  const iconColor = '#FF8357'
  let activeStyle = {
    background: '#89D5C9',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 8,
    width: '100%',
  }

  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '20%', boxSizing: 'border-box' },
        }}
        variant="permanent"
      >
        <div className='container'>
          <img src={LogoOrange} style={{ width: 60 }} alt="Logo" />
          <span className='brand'>Foorder</span>
        </div>
        <List component={'nav'}>
          <ListItemButton>
            <ListItemIcon>
              <Info sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/dashboard" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Dashboard</NavLink>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Person sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/users" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>User</NavLink>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Store sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/stores" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Cửa hàng</NavLink>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/admins" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Admin</NavLink>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Discount sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/vouchers" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Voucher</NavLink>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
