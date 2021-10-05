import React from 'react';
import styles from './Profile.module.scss'
import defaultAvatar from '../../Images/user.svg'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../Store/Store';
import Table from '../Table/Table';
import SuperInputText from '../../Common/Test/c1-SuperInputText/SuperInputText';
import {ProfileDataType} from '../../Store/Reducers/ProfileReducer';
import { Deck } from '../Deck/Deck';

export const Profile = () => {
    const userData = useSelector<AppRootStateType, ProfileDataType>(state => state.profile.profileData)

    return (
        <section className={styles.profile}>
            <div className={'container'}>
                <div className={styles.profile__inner}>
                    <div className={styles.profile__info}>
                        <div className={styles.profile__avatar}>
                            <img src={userData?.avatar ? userData.avatar : defaultAvatar} alt=" "/>
                        </div>
                        <div className={styles.profile__description}>
                            <p>{userData?.email}</p>
                            <p>{userData?.name}</p>
                            <p>Your cards: {userData?.publicCardPacksCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}