import { ReactNode, useEffect, useState } from 'react';
import styles from './custom-lists-sidebar.module.scss';
import { IoMdAdd } from "react-icons/io";
import { List } from '../../common/apis/backend/types/find-lists-by-user-requests';
import { findListsByUser } from '../../common/apis/backend/backend.api';
import { useNavigate } from 'react-router-dom';

const CustomListsSidebar = () => {
    const navigate = useNavigate();

    const [singleLists, setSingleLists] = useState<List[]>([]);
    const [sharedLists, setSharedLists] = useState<List[]>([]);

    useEffect(() => {
        getAndSetLists();
    }, []);

    async function getAndSetLists(){
        const { singleLists, sharedLists } = await findListsByUser();
        setSingleLists(singleLists);
        setSharedLists(sharedLists);
    }

    function mapList(list: List, index: number): ReactNode {
        return (
            <div className={styles.list_div} key={index}>
                <h3> {list.name} </h3>
                    <p> {list.countMovie} filmes - {list.countTV} séries</p>
            </div>
        );        
    }

    return (
        <div className={styles.custom_lists_sidebar}>
            <h2> Suas Listas <div className={styles.icon} onClick={() => navigate('/create-list')}><IoMdAdd /></div> </h2>

                {singleLists.length > 0 && singleLists.map((list, index) => mapList(list, index))}
                {singleLists.length < 1 && ( <p> Nenhuma lista! </p> )}

            <h2> Listas compartilhadas </h2>

                {sharedLists.map((list, index) => mapList(list, index))}
                {sharedLists.length < 1 && ( <p> Nenhuma lista! </p> )}
        </div>
    );
}

export default CustomListsSidebar;