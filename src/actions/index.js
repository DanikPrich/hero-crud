import { createAction } from "@reduxjs/toolkit";

//Таким образом мы централизованно выполняем асинхронную операцию прямо в dispatch и записываем данные
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

//Принимает два аргументы - тип действия и вспомогательная функция которая принимает значение и в возврате что то вернет в payload
export const heroesFetching = createAction('HEROES_FETCHING')

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED')

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHeroById = (id) => {
    return {
        type: 'HEROES_DELETE_BY_ID',
        payload: id
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const setActiveFilter = (newActiveFilter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: newActiveFilter
    }
}

//когда actionCreator будет вызываться, он будет возаращать функцию которая принимает dispatch
//Это нужно понять - что если используем thunk-middleware - dispatch входит сюда автоматически (не нужно испортировать ни от куда)
// export const setActiveFilter = (newActiveFilter) => (dispatch) => {
//     //Поэтому теперь мы можем вызывать dispatch в асинхронных функциях 
//     setTimeout(() => {
//         dispatch({
//             type: 'SET_ACTIVE_FILTER',
//             payload: newActiveFilter
//         })
//     }, 1000)
// }