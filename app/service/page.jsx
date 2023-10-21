import React from 'react';

const MyPDFPage = () => {
  return (
    <embed src={process.env.BACKEND_URL + 'files/files/server.pdf'} type="application/pdf" width="100%" height="600px" />
  );
};

export default MyPDFPage;