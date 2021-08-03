import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../index.scss';
import Footer from '../../Layout/Footer';

const UserPublicHomePage = () => {
  const circle = React.useMemo(() => {
    const rs = [];
    for (let i = 0; i < 50; i += 1) {
      rs.push(
        <div className="circle-container" key={i}>
          <div className="circle" />
        </div>,
      );
    }
    return rs;
  }, []);
  return (
    <div className="public-page">
      <div className="background">
        <Header />
        <main>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              '-webkit-transform': 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
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
        {circle}
      </div>
    </div>
  );
};

UserPublicHomePage.propTypes = {};

export default UserPublicHomePage;
