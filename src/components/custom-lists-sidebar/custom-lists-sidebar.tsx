import { ReactNode, useEffect, useState } from 'react';
import styles from './custom-lists-sidebar.module.scss';
import { IoMdAdd } from "react-icons/io";
import { List } from '../../common/apis/backend/types/find-lists-by-user-requests';
import { findListsByUser } from '../../common/apis/backend/backend.api';

const CustomListsSidebar = () => {
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

    function mapList(list: List): ReactNode {
        return (
            <div className={styles.list_div}>
                <h3> {list.name} </h3>
                    <p> {list.countMovie} filmes - {list.countTV} séries</p>
            </div>
        );        
    }

    return (
        <div className={styles.custom_lists_sidebar}>
            <h2> Suas Listas <div className={styles.icon}><IoMdAdd /></div> </h2>

                {singleLists.map((list) => mapList(list))}

            <h2> Listas compartilhadas </h2>

                {sharedLists.map((list) => mapList(list))}
        </div>
    );
}

export default CustomListsSidebar;