import React, { useEffect, useState } from 'react'
import "./style.css"

// localStorage data getting back
const getDataBack = () => {
    const lists = localStorage.getItem('mydotolist')
    if (lists) {
        return JSON.parse(lists)
    } else {
        return []
    }
}

const ToDoList = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getDataBack())
    const [isEditItem, setIsEditItem] = useState('')
    const [toggleButton, setToggleButton] = useState(false)

    // Add button functionality
    const addButton = () => {
        if (!inputData) {
            alert('Add the task')
        } else if (inputData && toggleButton) {
            setItems(
                items.map((val) => {
                    if (val.id === isEditItem.id) {
                        return {...val, name: inputData}
                    }else{
                        return val
                    }
                })
            )
            setToggleButton(false)
            setIsEditItem(null)
            setInputData('')
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData('')
        }
    }

    // deleting the item
    const deleteItems = (index) => {
        const updatedItems = items.filter((val) => {
            return val.id !== index
        })
        setItems(updatedItems)
    }

    const deleteAllItems = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem('mydotolist', JSON.stringify(items))
    }, [items])

    // Edit Item Functionality
    const editItems = (index) => {
        const item_tobe_edit = items.find((curElem) => {
            return curElem.id === index
        })
        // console.log(item_tobe_edit);
        setIsEditItem(item_tobe_edit)
        setToggleButton(true)
        setInputData(item_tobe_edit.name)
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todolist.svg" alt="todologo" />
                        <figcaption>Add your list here ✍🏻</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='Add note' value={inputData} onChange={(e) => setInputData(e.target.value)} />

                        {
                            toggleButton ? (
                                <i className="fa fa-solid fa-edit add-btn" onClick={addButton}></i>
                            ) : (
                                <i className="fa fa-solid fa-plus add-btn" onClick={addButton}></i>
                            )
                        }



                    </div>

                    {/* show list itemss */}

                    {
                        items.map((curVal) => {
                            return (
                                <div className="showItems" key={curVal.id}>
                                    <div className="eachItems">
                                        <h3>{curVal.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItems(curVal.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItems(curVal.id)}></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* Remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAllItems}>
                            <span>
                                Check List
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoList
