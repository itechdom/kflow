import { configureStore } from '@reduxjs/toolkit'
import crudDomainStore  from 'Libs/react-services/crud-service/features/crudDomainSlice'
import formDomainStore  from 'Libs/react-services/forms-service/features/formDomainSlice'
import wikiDomainStore from 'Libs/react-services/wikipedia-service/features/wikiDomainSlice'
export default configureStore({
    reducer: {
        crudDomainStore,
        formDomainStore,
        wikiDomainStore
    },
})