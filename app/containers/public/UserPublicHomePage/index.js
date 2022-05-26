import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../index.scss";
import Footer from "../../Layout/Footer";
import StarBackground from "../components/StarBackground/StarBackground";

const UserPublicHomePage = () => (
  <div className="public-page">
    <StarBackground />
    <Header />
    <main>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          WebkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h1 className="text-center">
          Welcome to YoctoERP
          <br />
          Open source system for School, small company
        </h1>
        <Link className="btn btn-outline-primary mt-4" to="/admin">
          Admin Page
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

UserPublicHomePage.propTypes = {};

export default UserPublicHomePage;
