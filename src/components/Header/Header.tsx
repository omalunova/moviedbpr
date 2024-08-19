'use client'

import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "@/store/actions/themeActions";
import s from './header.module.css'
import GenreFilter from "@/components/GenreFilter/GenreFilter";
import SearchBar from "@/components/SearchBar/SearchBar";
import UserIcon from "@/components/UserIcon/UserIcon";


const Header: FC = () => {
    const dispatch = useDispatch()
    const isDarkMode = useSelector((state: any) => state.theme.isDarkMode)
    const username = 'JonSmith'

    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    }

    return (
        <header className={`py-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
            <div className={`container mx-auto flex justify-between items-center`}>
                <div className={'flex items-center'}>
                    <img

                        className={'h-16 w-auto'}
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                        alt="logo"/>
                </div>
                <nav className={'flex items-center space-x-3'}>
                    <SearchBar/>
                    <GenreFilter/>

                    <button
                        className={'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'}
                        onClick={handleToggleTheme}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
                    <UserIcon username={username}/>
                </nav>

            </div>
        </header>
    );
};

export default Header;