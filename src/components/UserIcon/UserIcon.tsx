import React, {FC} from 'react';

interface UserIconProps {
    username: string;
}
const UserIcon:FC<UserIconProps> = ({username}) => {
    return (
        <div className={"flex items-center space-x-2"}>
            <span className={'text-gray-800 dark:text-gray-800 font-semibold text-lg'}>{username}</span>
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                <span className={'text-xl text-white font-semibold'}>{username.charAt(0).toUpperCase()}</span>
            </div>

        </div>
    );
};

export default UserIcon;