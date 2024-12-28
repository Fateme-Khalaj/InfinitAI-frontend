import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import Categories from "src/pages/Categories";
// import PopularDownloads from "src/pages/PopularDownloads";
// import NewDownloads from "src/pages/NewDownloads";
import { BackgroundDiv } from "src/styled-components/background";
import Header from "src/components/header/Header";
import Footer from "src/components/footer/Footer";
import Landing from "src/pages/Landing/Landing";
import styled from "styled-components";
import Support from "src/pages/Support/Support";
import Chat from "src/pages/Chat/Chat";
import Voice from "src/pages/Voice/Voice";
import Depth from "src/pages/Depth/Depth";

const Content = styled.div`
  flex: 1;
`;

const AppRoutes = () => {
  return (
    <Router>
      <BackgroundDiv>
        <Header/>
        <Content>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/support" element={<Support />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/depth" element={<Depth />} />
            {/* <Route path="/categories" element={<Categories />} />
            <Route path="/popular-downloads" element={<PopularDownloads />} />
            <Route path="/new-downloads" element={<NewDownloads />} /> */}
          </Routes>
        </Content>
        <Footer />
      </BackgroundDiv>
    </Router>
  );
};
export default AppRoutes;
