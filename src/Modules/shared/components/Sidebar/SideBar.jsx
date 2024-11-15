import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import navlogo from "../../../../assets/navlogo.png";
export default function SideBar() {
  let [isCollapsed, setCollapsed] = useState(false);

  let chage = () => {
    console.log(isCollapsed);
    setCollapsed(!isCollapsed);
  };
  return (
    <div className="container-sidebar">
      <Sidebar collapsed={isCollapsed}>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "red" : "#ffffff",
                  backgroundColor: active ? " #1F263E" : " #1F263E",
                };
            },
          }}
        >
          <MenuItem
            icon={<img src={navlogo} onClick={()=>{chage()}} className="navlogo" alt="foodRecipe" />}
            component={<Link to="/DashBoard"/>}

            className="m-3 py-3"
          >

          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-house-chimney"></i>}
            component={<Link to="/DashBoard" />}
          >

            Home
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-user"></i>}
            component={<Link to="User" />}
          >

            User
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-cubes-stacked"></i>}
            component={<Link to="Recipe-List" />}
          >
            Recipe
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-list"></i>}
            component={<Link to="Categories-List" />}
          >
            categories
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-unlock-keyhole"></i>}
            component={<Link to="/Reset-Password" />}
          >

            Change password
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            component={<Link to="/login" />}
          >

            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
