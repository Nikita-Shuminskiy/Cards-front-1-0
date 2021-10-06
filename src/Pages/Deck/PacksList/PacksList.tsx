import Table from '../../Table/Table';
import React  from 'react';
import SuperButton from '../../../Common/Test/c2-SuperButton/SuperButton';
import s from './PacksList.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { CardPackType, DeckInitStateType, getUserThunk, searchNameTC } from '../../../Store/Reducers/DeckReducer';
import { SearchByName } from '../../../Common/Search/SearchByName';
import { AppRootStateType } from '../../../Store/Store';
import { Paginator } from '../../../Common/Test/Paginator/Paginator';
import ModelForPacks from '../ModalForDeck/ModelForPacks';
import {AppInitStateType, changeModeModal, ModelType } from '../../../Store/Reducers/AppReducer';
import ModelForLearn from '../ModelForLearn/ModelForLearn';
import { CardType } from '../../../Store/Reducers/CardsReducer';

export const PacksList = React.memo(() => {
    const {model,statusTraining} = useSelector<AppRootStateType, AppInitStateType>(state=> state.app)
    const learnCard = useSelector<AppRootStateType, CardType[]>(state=> state.cards.learnCards)
    const dispatch = useDispatch()
    const {cardPacksTotalCount, pageCount, cardPacks, page}
        = useSelector<AppRootStateType, DeckInitStateType>(state => state.deck)
    const handlerSearchName = (name: string) => dispatch(searchNameTC(name))
    const onSubmit = () => {
       dispatch(changeModeModal('add'))
    }
    const pageClickChange = (page: number) => {
        dispatch(getUserThunk(page, pageCount))
    }
    const modal = learnCard.map((i)=> {
        return <ModelForLearn
            key={i._id}
            id={i._id}
            answer={i.answer}
            question={i.question}
            cardPaskId={i.cardsPack_id}
        />
    })
    return (

        <div className={s.container}>
            <h3>Packs list</h3>
            <div className={s.header}>
                <SearchByName searchName={handlerSearchName}/>
                <SuperButton value={'Add new pack'} onClick={onSubmit}/>
            </div>
            <div>
                <Table/>
            </div>
            <div>
                <Paginator pageClickChange={pageClickChange} currentPage={page} pageSize={pageCount}
                           totalCount={cardPacksTotalCount}/>
            </div>
            {model !== 'notShow' && <ModelForPacks  model={model}/>}
            {statusTraining  && modal}
        </div>
    );
});