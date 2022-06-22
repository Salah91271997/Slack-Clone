import React, { useState } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleChannels, setToggleChannels] = useState(false);
  // const [active, setActive] = useState(false);
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Welcome </h2>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <Wrapper className={`${!toggleMenu ? "" : "collapse"}`}>
        <SidebarOption Icon={InsertCommentIcon} title="Threads" />
        <SidebarOption Icon={InboxIcon} title="Mentions" />
        <SidebarOption Icon={DraftsIcon} title="Saved items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File browser" />
      </Wrapper>
      <div onClick={() => setToggleMenu(!toggleMenu)}>
        {!toggleMenu ? (
          <SidebarOption Icon={ExpandLessIcon} title="Show less" />
        ) : (
          <SidebarOption Icon={ExpandMoreIcon} title="Show more" />
        )}
      </div>
      <hr />

      <div onClick={() => setToggleChannels(!toggleChannels)}>
        {!toggleChannels ? (
          <SidebarOption Icon={ExpandLessIcon} title="Channels" />
        ) : (
          <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
        )}
      </div>

      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

      <Wrapper className={`${!toggleChannels ? "" : "collapse"}`}>
        {channels?.docs.map((doc) => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        ))}
      </Wrapper>
      {/* <Menu>
        <div className="menu">
          <h5>Create Channel</h5>
          <h5>Browse Channel</h5>
        </div>
      </Menu> */}
    </SidebarContainer>
  );
};

export default Sidebar;
const Wrapper = styled.div`
  transition: 5s;
  &.collapse {
    display: none;
  }
`;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.2;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 55px;
  > hr {
    height: 1px;
    border: 0;
    background-color: #49474b;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
    cursor: pointer;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 8px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
const Menu = styled.div`
  position: relative;
  .menu {
    position: absolute;
    left: 25%;
    bottom: -20px;
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    color: black;
    max-width: 250px;
    min-width: 200px;
    overflow-y: auto;
    padding: 5px 8px;
    user-select: none;
    text-align: center;
    z-index: 1012;
    h5 {
      cursor: pointer;
      padding: 5px 0;
    }
    h5:hover {
      background-color: #1164a3;
    }
  }
`;
