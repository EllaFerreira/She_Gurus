import React from 'react'
import { useLocation } from 'react-router-dom';
import content from '../content';
import CardStyled from './Card';

export default function AboutCardList() {
    const location = useLocation();
    function render(){
        const allowedPath = [
            '/signin',
            '/signup',
            '/'
        ];
        console.log(location.pathname);
        const pathName = location.pathname;
        if (allowedPath.includes(pathName)){
            return content.map((item, index) => (
              <CardStyled key={index} item={item} />
            ));
        }
        return "";
    }
    return (
      <div>
        {render()}
      </div>
    );
}
