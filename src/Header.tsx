import React from 'react';

type HeaderPropsType = {

}

const Header = (props: HeaderPropsType) => {
    return (
        <div>
            <a href="#">Home</a>
            <a href="#">News Feed</a>
            <a href="#">Messages</a>
        </div>
    );
};

export default Header;