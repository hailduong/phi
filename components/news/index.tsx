import {useEffect, useState} from "react";
import {TNewsEntity} from "../../services/newsService/newsTypes";
import newsService from "../../services/newsService/newsService"
import s from "../patients/index.module.scss";
import AddNews from "./AddNews";
import NewsItem from "./NewsItem";


const NewsPageContent = () => {

    const [news, setNews] = useState<TNewsEntity[]>([])

    const getData = async () => {
        const data = await newsService.getNews()
        if (data?.status?.code === 200) {
            setNews(data.data)
        }
    }

    const handleDeleteNews = async (newsId: number) => {
        const response = await newsService.deleteNews(newsId)

        if (response?.status.code === 200) {
            getData()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [showAddNewsForm, setShowAddNewsForm] = useState(false)

    const toggleAddNewsBox = () => {
        setShowAddNewsForm(!showAddNewsForm)
    }

    const handleNewsAdded = async () => {
        setShowAddNewsForm(false)
        await getData()
    }

    const buttonAdd = showAddNewsForm ? 'btn-default' : 'btn-primary'

    const newsList = news.map(dataItem => <NewsItem onDeleteNews={handleDeleteNews} newsData={dataItem}
                                                          key={dataItem.id}/>)
    return (
        <div className="wrapper wrapper-content animated fadeInUp">
            <div className="row">
                <div className="col-lg-12 tab-seeContent">
                    <div className="ibox">
                        <div className={`${s.boxTitle} ibox-title`}>
                            <h5>News List</h5>
                            {showAddNewsForm ? null :
                                <div className={`${s.addButton} ibox-tools`}>
                                    <a onClick={toggleAddNewsBox}
                                       className={`btn ${buttonAdd}`}>Add News</a>
                                </div>}
                            {showAddNewsForm ? <AddNews onCancelAdding={toggleAddNewsBox}
                                                              onNewsAdded={handleNewsAdded}/> : null}
                        </div>
                        <div className="ibox-content">
                            <div className="patient-list">
                                <table className="table table-hover">
                                    <tbody>
                                    {newsList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsPageContent