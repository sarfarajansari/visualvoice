import React, { useMemo } from "react";
import styled from "styled-components";
import { RiDashboardHorizontalFill as DashboardIcon } from "react-icons/ri";
import { PiUsersThreeFill as StaffIcon } from "react-icons/pi";
import { Dropdown, Space, Spin, Tooltip } from "antd";
import { Link, useLocation } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { apiClient } from "../../apiClient/apiClient";

const Container = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  background-color: #faedce;
  width: 280px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  a {
    text-decoration: none;
    color: black;
  }

  /* gap: 10px; */

  .menu-container {
    background-color: #fefae0;
    height: calc(100vh - 48px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .menu {
    justify-content: left;
    padding: 13px;
    cursor: pointer;
    font-family: sans-serif;
    /* transition: all 0.2s; */

    &:hover,
    &.active {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      margin: 3px;
      padding: 10px;
    }
  }

  .dropdown-container {
    padding: 14px 0;
    font-family: sans-serif;
    font-weight: 600;
    text-align: center;
    border-bottom: 1px solid #dab681;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #fefae0;
    }
  }
`;

const menus = ["Caption Stream", "Class Capture"];
export const sidebarContext = React.createContext({
  active: "",
  setActive: () => {},
  menus: [],
  header: "Visual Voice",
  setHeader: () => {},
});
export const useSidebar = () => React.useContext(sidebarContext);

const Provider = sidebarContext.Provider;
export const AppLodingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #fefae0;
`;
export const SidebarProvider = ({ value, children }) => {
  return <Provider value={{ ...value }}>{children}</Provider>;
};

const Sidebar = () => {
  const { active } = useSidebar();

  const location = useLocation();
  const activeTopic = useMemo(() => {
    const path = location.pathname.split("/");
    if (path.length > 1) {
      return path[1].replaceAll("%20", " ");
    }
  }, [location.pathname]);

  return (
    <Container>
      <div>
        <Link to={`/`}>
          <div className="dropdown-container">
            <Space>Home</Space>
          </div>
        </Link>
      </div>

      <div className="menu-container">
        {menus.map((menu) => {
          return (
            <Link to={`/${menu}`}>
              <div
                className={`menu ${
                  active === menu || activeTopic === menu ? "active" : ""
                }`}
                key={menu}
              >
                {menu}
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
};

export default Sidebar;
