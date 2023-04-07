import { configureStore } from '@reduxjs/toolkit'
import crudDomainStore  from '../react-services/crud-service/features/crudDomainSlice'
import formDomainStore  from '../react-services/forms-service/features/formDomainSlice'
import wikiDomainStore from '../react-services/wikipedia-service/features/wikiDomainSlice'
export default configureStore({
    reducer: {
        crudDomainStore,
        formDomainStore,
        wikiDomainStore
    },
})