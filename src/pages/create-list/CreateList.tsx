import { useEffect, useState } from "react";
import { VisibilitiesEnum } from "../../common/apis/backend/enums/visibilities.enum";
import { Content } from "../../common/apis/backend/types/content.type";
import EnumSelect from "../../components/enum-select/EnumSelect";
import styles from './CreateList.module.scss';
import { ContentTypesEnum } from "../../common/apis/backend/enums/content-type.enum";
import { createList, searchContent } from "../../common/apis/backend/backend.api";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreateList = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string | null>(null);
    const [visibility, setVisibility] = useState<VisibilitiesEnum>(Object.values(VisibilitiesEnum)[0]);
    const [contents, setContents] = useState<any[]>([]);
    const [contentsToAdd, setContentsToAdd] = useState<Array<Content & { title: string, posterPath: string }>>([]);

    const [query, setQuery] = useState<string>('');
    const [type, setType] = useState<ContentTypesEnum>(Object.values(ContentTypesEnum)[0]);

    useEffect(() => {
        if (query != '') search();
        else setContents([]);
    }, [query, type]);

    async function create(){
        if (name) {
            const response = await createList(name, visibility, contentsToAdd.map(content => ({ ...content, posterPath: undefined, title: undefined })));
            if (response.success) navigate('/');
            else window.alert("Algo deu errado");
        } else window.alert(`Preencha o nome da lista!`);
    }

    async function search(){
        if (query && type) {
            const response: any = await searchContent(type, query)
                .catch(error => {
                    console.log(error.response.data.statusCode)
                    if (error?.response?.data?.statusCode === 404) return null;
                    else window.alert(error?.response?.data?.message);
                });
            
            setContents(response ? response.results : response);
        } else window.alert(`Preencha o campo de busca e o tipo de conteúdo!\nTipo: ${type}\nPesquisa: ${query}`);
    }

    function addContent(index: number){
        const tmdbContent = contents[index];

        const content = {
            title: tmdbContent.title ?? tmdbContent.name,
            tmdbId: tmdbContent.id,
            type,
            posterPath: tmdbContent.poster_path
        };

        setContentsToAdd(prev => [...prev, content]);
    }

    return (
        <div className={styles.CreateList}>
            <h1> Criar lista </h1>

            <label htmlFor="name"> Nome da lista </label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>

            <EnumSelect enumObject={VisibilitiesEnum} label="Visibilidade" onChange={(e) => setVisibility(e.target.value)}/>

            {contentsToAdd.length > 0 && (
                <>
                <p> Conteúdos adicionados </p>
                <div className={styles.content_to_add}>
                    {contentsToAdd && contentsToAdd.map((content, index) => {
                        return (
                            <div key={index} className={styles.content}>
                                <img width={50} src={`https://image.tmdb.org/t/p/w500/${content.posterPath}`}/>
                                <p> {content.title} </p>
                            </div>
                        );
                    })}
                </div>

                {name && (
                    <button onClick={create}> Criar lista </button>
                )}
                </>
            )}


            <label className={styles.search_label} htmlFor="query"> Pesquisar conteúdo </label>
            <input type="text" name="query" id="query" onChange={(e) => setQuery(e.target.value)} value={query}/>

            <EnumSelect enumObject={ContentTypesEnum} label="Tipo" value={type} onChange={(e) => setType(e.target.value)}/>

            <div className={styles.content_list}>
                {!contents && (
                    <p> Nenhum conteúdo encontrado! </p>
                )}
                {contents && contents.length > 0 && contents.map((content, index) => {
                    return (
                        <div key={index} className={styles.content}>
                            <img width={200} src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}/>
                            <div>
                                <h3> {content.title ?? content.name} </h3>
                                <p> {content.overview} </p>
                                <button className={styles.add} onClick={() => addContent(index)}> <IoMdAdd/> Adicionar à lista  </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CreateList;