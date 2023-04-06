import { configureStore } from '@reduxjs/toolkit'
import crudDomainStore  from '../react-services/crud-service/features/crudDomainSlice'

export default configureStore({
    reducer: {
        crudDomainStore
    },
})