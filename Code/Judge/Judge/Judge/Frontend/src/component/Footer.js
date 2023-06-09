
import React  from 'react';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-600 mb-3">
            <div className="px-4 mx-auto flex flex-wrap item-center justify-between">
               <span className="text-white"> <a href="https://beian.miit.gov.cn/" target="_blank">备案号：粤ICP备20010683号</a> </span>
            </div>
    </footer>
  );
}

export default Footer;
