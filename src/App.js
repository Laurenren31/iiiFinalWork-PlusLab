import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import NavLogOut from "./components/NavLogOut";
import Footer from "./components/Footer";
import FooterSticky from "./components/FooterSticky";
import Homepage from "./pages/Homepage";
import DashBoard from "./pages/DashBoard";
import News from "./pages/News";
import NewsNewsOne from "./pages/NewsNewsOne";
import ProfileTop from "./components/Profile/ProfileTop";
import ProfileStockCollection from "./components/Profile/ProfileStockCollection";
import ProfileOwnCourse from "./components/Profile/ProfileOwnCourse";
import ProfileCourseCollection from "./components/Profile/ProfileCourseCollection";
import ProfileArticleCollection from "./components/Profile/ProfileArticleCollection";
import { Routes, Route } from "react-router-dom";
import NewsData from "../src/components/News/news.json";
import "./styles/style.css";

export const articleValueContext = React.createContext();
export const loginStatusContext = React.createContext();

function App() {
  const [articleValue, setArticleValue] = useState(7);
  const [topValue, setTopValue] = useState(0);

  const handleScroll1 = () => {
    let scrollTop = window.pageYOffset;
    if (scrollTop > topValue) {
      setTopValue(scrollTop);
      if (articleValue === 20) {
        return;
      }
      if (scrollTop > 4575) {
        setArticleValue(20);
        return;
      }
      if (articleValue === 16) {
        return;
      }
      if (scrollTop > 3450) {
        setArticleValue(16);
        return;
      }
      if (articleValue === 13) {
        return;
      }
      if (scrollTop > 2325) {
        setArticleValue(13);
        return;
      }
      if (articleValue === 10) {
        return;
      }
      if (scrollTop >= 1200) {
        setArticleValue(10);
        return;
      }
    }
  };

  const location = useLocation();
  const [scrollToHere, setScrollToHere] = useState(0);

  useEffect(() => {
    if (
      location.pathname.split("/")[1] == "news" &&
      location.pathname.split("/").length == 2
    ) {
      if (scrollToHere == 0) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, scrollToHere);
      }

      const handleScroll = (value) => {
        handleScroll1(value);
        let scrollPosition = window.pageYOffset;
        setScrollToHere(scrollPosition);
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, articleValue]);

  const [login, setLogin] = useState(false);
  const [showNav, setShopwNav] = useState(<NavLogOut />);

  const loginOrNot = (item) => {
    setLogin(item);
    localStorage.setItem("login", item);
  };

  const showWhichNav = () => {
    if (localStorage.login == "true") {
      setShopwNav(<Nav />);
      return;
    }
    if (localStorage.login == "false") {
      setShopwNav(<NavLogOut />);
      return;
    }
  };

  useEffect(() => {
    showWhichNav();
  }, [login]);

  return (
    <div className="App">
      <loginStatusContext.Provider value={{ login, setLogin: loginOrNot }}>
        {showNav}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <DashBoard />
                <Footer />
              </>
            }
          />
          {NewsData.map((page) => (
            <Route
              key={page}
              path={`/news/news${page.key}`}
              element={
                <>
                  <NewsNewsOne />
                  <FooterSticky />
                </>
              }
            />
          ))}
          <Route
            path="/news"
            element={
              <>
                <articleValueContext.Provider value={articleValue}>
                  <News />
                </articleValueContext.Provider>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProfileTop />
                <ProfileStockCollection />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile/ownCourse"
            element={
              <>
                <ProfileTop />
                <ProfileOwnCourse />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile/courseCollection"
            element={
              <>
                <ProfileTop />
                <ProfileCourseCollection />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile/articleCollection"
            element={
              <>
                <ProfileTop />
                <ProfileArticleCollection />
                <Footer />
              </>
            }
          />
        </Routes>
      </loginStatusContext.Provider>
    </div>
  );
}

export default App;
