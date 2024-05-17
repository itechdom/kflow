import { configureStore } from '@reduxjs/toolkit';
import crudDomainStore from 'Libs/react-services/crud-service/features/crudDomainSlice';
import formDomainStore from 'Libs/react-services/forms-service/features/formDomainSlice';
import wikiDomainStore from 'Libs/react-services/wikipedia-service/features/wikiDomainSlice';
import mindmapReducer from '../Knowledge/ModelPreview/Model.Preview.feature'; // Adjust the path as needed

export default configureStore({
  reducer: {
    crudDomainStore,
    formDomainStore,
    wikiDomainStore,
    mindmap: mindmapReducer, // Add the mindmap reducer here
  },
});
