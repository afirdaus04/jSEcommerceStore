import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';


// Create dynamic year command
const yearNow = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="copyright">Ahmad's Store 2015-{yearNow}</div>
      <p>All rights reserved</p>
      <p className="icons">
        <AiFillInstagram onClick={() => {}} />
        <AiOutlineTwitter onClick={() => {}} />
      </p>
    </div>
  )
}

export default Footer