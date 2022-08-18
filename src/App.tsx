import React from 'react';
import './App.css';

function App() {
    return (
        <div className='container'>
            <div className="app">
                <header className="header">
                    <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png" alt=""/>
                </header>

                <nav className="nav">
                    <ul>
                        <li>Profile</li>
                        <li>Messages</li>
                        <li>News</li>
                        <li>Music</li>
                        <li>Settings</li>
                    </ul>
                </nav>

                <div className="content">
                    <div>
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt=""
                            className='content-img'/>
                    </div>
                    <div>
                        ava + description
                    </div>
                    <div>
                        My posts
                        <div>
                            New post
                        </div>
                        <div>post 1</div>
                        <div>post 2</div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
