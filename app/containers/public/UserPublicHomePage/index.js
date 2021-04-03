import React from 'react';
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
          <div className="container-fluid">
            <h1>Test</h1>
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
