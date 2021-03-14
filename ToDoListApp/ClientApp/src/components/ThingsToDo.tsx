import React, {useState, useEffect} from "react";

//import {connect} from "react-redux";
import * as actions from "../actions/thingToDo";
import ThingToDoForm from "./ThingToDoForm";
import { useToasts } from "react-toast-notifications";
import './ThingsToDo.css';
const { connect } = require('react-redux');

const ThingsToDo = ({...props}) => {
    const[currentId, setCurrentId] = useState(0)
    useEffect(() => {
        props.fetchAllThingsToDo()
    }, [])
    const {addToast} = useToasts()
  
    const onDelete = (id: any) => {
        props.deleteThingToDo(id, addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (<div className='containerFlex'>
        <div>
            <ThingToDoForm {...({currentId, setCurrentId})}/>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Content</th>
                        <th>Finished</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.thingToDoList.map((record: any, index: any) => {
                        return (
                            <React.Fragment>
                                {(() => {
                                    if (!record.isDone) {
                                        return (
                                            <tr key={index}>
                                                <th>{record.content}</th>
                                                <th>
                                                    <input type="checkbox" checked={record.isDone} disabled/>
                                                </th>
                                                <th>
                                                    <input type="button" value="Edit" onClick={()=>{setCurrentId(record.id)}}/>
                                                    <input type="button" value="Delete" onClick={()=>onDelete(record.id)}/>
                                                </th>
                                            </tr>
                                        )
                                    }
                                    return null;
                                })()}
                            </React.Fragment>
                        )
                    })
                }
                {
                    props.thingToDoList.map((record: any, index: any) => {
                    return(
                    <React.Fragment>
                    {(() => {
                        if (record.isDone){
                            return (
                                <tr key={index}>
                                    <th className="lineThroughText">
                                        {record.content}
                                    </th>
                                    <th>
                                        <input type="checkbox" checked={record.isDone} disabled/>
                                    </th>
                                    <th>
                                        <input type="button" value="Edit" onClick={()=>{setCurrentId(record.id)}}/>
                                        <input type="button" value="Delete" onClick={()=>onDelete(record.id)}/>
                                    </th>
                                </tr>
                            )
                        }
                        return null;
                    })()}
                    </React.Fragment>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    </div>);
}
const mapStateToProps = (state: any) => ({
    thingToDoList: state.thingToDo.list
})
const mapActionToProps = {
    fetchAllThingsToDo: actions.fetchAll,
    deleteThingToDo: actions.Delete
}
export default connect(mapStateToProps, mapActionToProps)(ThingsToDo);