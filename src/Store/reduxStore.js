import { configureStore } from '@reduxjs/toolkit'
import crudDomainStore  from '../react-services/crud-service/features/crudDomainSlice'
import formDomainStore  from '../react-services/forms-service/features/formDomainSlice'

export default configureStore({
    reducer: {
        crudDomainStore,
        formDomainStore
    },
})