import React from 'react';

const MyPDFPage = () => {
  return (
    <embed src={process.env.BACKEND_URL + 'files/files/server.pdf'} type="application/pdf" width="100%" height="1200px" />
  );
};

export default MyPDFPage;