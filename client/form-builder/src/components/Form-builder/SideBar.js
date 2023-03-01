import React, { useEffect, useState } from 'react';
import {useStickyBox} from "react-sticky-box";

const SideBar = () => {
  const stickyRef = useStickyBox({offsetTop: 20, offsetBottom: 20})
  return (<div className="row">
    <aside ref={stickyRef}>
      <div>Sidebar</div>
    </aside>
    <div>Content</div>
  </div>)
};

export default SideBar;