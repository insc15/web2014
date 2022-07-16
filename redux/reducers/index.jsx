export const Cart = (state =[], action) =>{    
    switch(action.type){
        case "ADD":
            const AddIndex = state.findIndex(i => i.gameID === action.payload.gameID)

            if(AddIndex !== -1) {
                state[AddIndex].count = Number(state[AddIndex].count += 1)
                return [...state]
            }else{
                action.payload.count = 1
                return [
                    ...state,
                    action.payload
                ]
            }
        case "REMOVE":
            const RemoveIndex = state.findIndex(i => i.gameID === action.payload)
            const array = [...state]
            array.splice(RemoveIndex, 1)
            return array
        default:
            return state
    }
}

export const LastRoute = (state = [], action) => {
    switch (action.type) {
        case "SET":
            return [
                action.payload
            ]   
        default:
            return state
    }
}

export const userLogin = (state = null, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "REMOVE":
            return null
        default:
            return state
    }
}