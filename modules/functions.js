import fetch from 'node-fetch';

// interface Props {
//     listId: String;
//     apiKey: String;
// }
export async function getTasks(props = {}) {

    const {listId, apiKey} = props

    if (!listId) return {status: 400, message: "you need to pass listId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}
    const query = new URLSearchParams({
        page: '0',
    }).toString();
    const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey
        }
        }
    );
    const data = await resp.json();
    return data
}

export async function createTask(props = {}) {
    const {listId, apiKey} = props
    if (!listId) return {status: 400, message: "you need to pass listId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}
    const query = new URLSearchParams({
    }).toString();
    const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey
        },
        body: JSON.stringify({
            name: 'Created from Express',
            description: 'created by bot!!!',
        })
        }
    );
    const data = await resp.json();
    console.log(data);
}


export async function editTask(props = {}) {
    const {taskId, apiKey} = props
    if (!taskId) return {status: 400, message: "you need to pass taskId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}
    
    try{
      const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey
          },
          body: JSON.stringify({
            name: 'Updated Task Name by express',
            description: 'Updated Task Content',
            
          })})
          return {status: 200, message: `${taskId} updated`}
        }catch{ 
            return {status: 500, message: "errror"}
        }
}


export async function getSingleTask(props = {}) {
    const {taskId, apiKey} = props
    if (!taskId) return {status: 400, message: "you need to pass taskId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}
    
    try{
        const resp = await fetch(
            `https://api.clickup.com/api/v2/task/${taskId}`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Authorization: apiKey
                }
            })
        const data = await resp.json();
          return data
        }catch{ 
            return {status: 500, message: "errror"}
        }
}


export async function handleWebhook(props = {}) {
    const {taskId, apiKey} = props
    if (!taskId) return {status: 400, message: "you need to pass taskId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}

    console.log("passing the data to getSingleTask")

    const taskData = await getSingleTask(props)
    console.log(taskData)

    // validate if the taskData is there
    // const {message} = taskData
    // const {status} = message

    return taskData
}


export async function updateCustom(props ={}){
    const {taskId, apiKey, fieldId} = props
    if (!taskId) return {status: 400, message: "you need to pass taskId"}
    if (!apiKey) return {status: 400, message: "you need to pass apiKey"}
    if (!fieldId) return {status: 400, message: "you need to pass fieldId"}


    const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/field/${fieldId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey
          },
          body: JSON.stringify({
            value: 'this value was changed by server.'
          })})
    const data = await resp.json()
    return data

}