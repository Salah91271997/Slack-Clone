import React from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const Header = () => {
  const [user] = useAuthState(auth);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  return (
    <HeaderContainer>
      <HeaderLeft>
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <input type="text" placeholder="Search" />
        <SearchIcon />
        <FilterListIcon />
      </HeaderSearch>

      <HeaderRight>
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => auth.signOut()}
        />
        {user ? <FiberManualRecordIcon /> : ""}
        <Wrapper>
          <HelpOutlineIcon />
        </Wrapper>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  position: relative;
  display: flex;
  flex: 0.3;
  align-items: center;

  /* margin-left: 20px; */
  > .MuiSvgIcon-root {
    /* margin-left: auto; */
    /* margin-right: 30px; */
    cursor: pointer;
  }
  &::before {
    content: "history";
    position: absolute;
    width: 50px;
    height: 20px;
    background-color: black;
    color: white;
    bottom: -44px;
    left: 0;
    padding: 10px;
    border-radius: 5px;
    display: none;
  }
  &:hover::before {
    display: block;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  width: 35px !important;
  height: 35px !important;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 15px;
  color: gray;
  border: 1px solid gray;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 90%;
    outline: none;
    color: white;
    @media (max-width: 920px) {
      min-width: 80%;
    }
  }
  .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
const Wrapper = styled.div``;
const HeaderRight = styled.div`
  position: relative;
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 40px;
  > div .MuiSvgIcon-root {
    margin: 0 5px;
    cursor: pointer;
  }
  > .MuiSvgIcon-root {
    position: absolute;
    bottom: 0;
    z-index: 10;
    right: 26px;
    font-size: 18px;
    margin-top: 1px;
    margin-right: 2px;
    border-radius: 50%;
    color: #2bac76;
  }
  ${Wrapper}::before {
    content: "help";
    position: absolute;
    width: 50px;
    height: 20px;
    background-color: black;
    color: white;
    bottom: -34px;
    right: -10;
    padding: 10px;
    border-radius: 5px;

    display: none;
  }
  ${Wrapper}:hover::before {
    display: block;
  }
`;
