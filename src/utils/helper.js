import backlog from '../utils/icons_FEtask/Backlog.svg'
import todo from '../utils/icons_FEtask/To-do.svg'
import inprog from '../utils/icons_FEtask/in-progress.svg'
import done from '../utils/icons_FEtask/Done.svg'
import cancel from '../utils/icons_FEtask/Cancelled.svg'
import np from '../utils/icons_FEtask/No-priority.svg'
import lp from '../utils/icons_FEtask/Img - Low Priority.svg'
import mp from '../utils/icons_FEtask/Img - Medium Priority.svg'
import hp from '../utils/icons_FEtask/Img - High Priority.svg'
import up from '../utils/icons_FEtask/SVG - Urgent Priority colour.svg'

// Function to get priority icon
export const getPriorityIcon = (priority) => {
    if (priority === 0) {
        return <img src={np} alt="" style={{ height: '16px' }} />
    } else if (priority === 1) {
        return <img src={lp} alt="" style={{ height: '16px' }} />
    } else if (priority === 2) {
        return <img src={mp} alt="" style={{ height: '16px' }} />
    } else if (priority === 3) {
        return <img src={hp} alt="" style={{ height: '16px' }} />
    } else if (priority === 4) {
        return <img src={up} alt="" style={{ height: '16px' }} />
    } else {
        return <img src={up} alt="" style={{ height: '16px' }} />
    }
}
export const getPriorityText = (priority) => {
    if (priority === 0) {
        return "No priority"
    } else if (priority === 1) {
        return "Low"
    } else if (priority === 2) {
        return "Medium"
    } else if (priority === 3) {
        return "High"
    } else if (priority === 4) {
        return "Urgent"
    } else {
        return <img src={up} alt="" style={{ height: '16px' }} />
    }
}

// Function to get status icon
export const getStatusIcon = (status) => {
    if (status === "Backlog") {
        return <img src={backlog} alt="" style={{ height: '16px' }} />
    } else if (status === "Todo") {
        return <img src={todo} alt="" style={{ height: '16px' }} />
    } else if (status === "In progress") {
        return <img src={inprog} alt="" style={{ height: '16px' }} />
    } else if (status === "Done") {
        return <img src={done} alt="" style={{ height: '16px' }} />
    } else if (status === "Canceled") {
        return <img src={cancel} alt="" style={{ height: '16px' }} />
    } else {
        return <img src={cancel} alt="" style={{ height: '16px' }} />
    }
}

export const getStatusText = (status) => {
    if (status === "Backlog") {
        return "Backlog"
    } else if (status === "Todo") {
        return "Todo"
    } else if (status === "In progress") {
        return "In progress"
    } else if (status === "Done") {
        return "Done"
    } else if (status === "Canceled") {
        return "Canceled"
    } else {
        return "Canceled"
    }
}
