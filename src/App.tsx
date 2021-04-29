import React, {useState} from 'react';
import './App.css';
import {Upload} from "antd";
import css from "./App.module.css"
import {UploadChangeParam} from "antd/lib/upload/interface";
import {InboxOutlined} from '@ant-design/icons';
import {Categories} from "./Categorizes";

const App = () => {
    const [image, setImage] = useState("")
    const [creativeCategory, setCreativeCategory] = useState("")
    const [categoryInfo, setCategoryInfo] = useState("")

    const getCategoryInfo: (key: string) => string = (key: string) => {
        const v = Object.entries(Categories).find((e) => e[0] === key)?.[1];
        return v ? v : ""
    }

    const onChange = (info: UploadChangeParam) => {
        const status = info.file.status;
        if (status === 'done') {
            setCategoryInfo(getCategoryInfo(info.file.response))
            setCreativeCategory(info.file.response)
            setImage(URL.createObjectURL(info.file.originFileObj))
        } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    }

    const renderHeader = () => {
        if (creativeCategory !== "") {
            return <div className={css.h1}>This is {creativeCategory} {categoryInfo}</div>
        } else {
            return <div className={css.h1}>What's that creative?</div>
        }
    }

    const drop = () => {
        setImage("")
        setCreativeCategory("")
    }

    const renderContent = () => {
        if (image !== "") {
            return (
                <img className={css.img} src={image} alt={""} onClick={drop}/>
            )
        } else {
            return (
                <div className={css.drag_and_drop_area}>
                    <Upload onChange={onChange}
                            action={"http://localhost:5000/predict"}
                            multiple={false}
                            showUploadList={false}>
                        <div style={{display: "flex", transform: "rotate(-5grad)"}}>
                            <InboxOutlined style={{fontSize: '1200%', margin: "auto", color: "#3364a3"}}/>
                        </div>
                    </Upload>
                </div>
            )
        }
    }

    return (
        <div className={css.container}>
            <div className={css.content}>
                {renderHeader()}
                {renderContent()}
            </div>
        </div>
    )
};

export default App;
