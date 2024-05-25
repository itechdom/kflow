```mermaid
flowchart TD
    A[Start] --> B[Import Required Services]
    B --> C[Define Kernel Function]
    C --> D[Define modelName as "kernel"]

    D --> E[Define crudDomainLogic]
    E --> E1[Create: Check isPermitted for kernel_create]
    E --> E2[Read: Check isPermitted for kernel_read]
    E --> E3[Update: Check isPermitted for kernel_update]
    E --> E4[Delete: Check isPermitted for kernel_delete]
    E --> E5[Search: Check isPermitted for kernel_search]

    D --> F[Initialize kernelApi with crudService]
    
    D --> G[Define vizDomainLogic]
    G --> G1[Average: Return criteria]
    G --> G2[Min: Return criteria]
    G --> G3[Max: Return criteria]
    G --> G4[Sum: Return criteria]
    G --> G5[Count: Return criteria]
    G --> G6[Distinct: Return criteria]

    D --> H[Initialize vizApi with vizService]
    
    D --> I[Define mediaDomainLogic]
    I --> I1[GetMedia: Return criteria with user details]
    I --> I2[SaveMedia: Return criteria with user details]
    
    D --> J[Initialize fileUploadApi with mediaService]
    
    D --> K[Define formsDomainLogic]
    K --> K1[Read: Return criteria with modelName]

    D --> L[Initialize formsApi with formsService]
    
    D --> M[Register Actions]
    M1[Register CRUD Action] --> M2[Register Media Action]
    M2 --> M3[Register Forms Action]

    M3 --> N[Return APIs: kernelApi, fileUploadApi, vizApi, formsApi]
    N --> O[End]

    style A fill:#f9f,stroke:#333,stroke-width:4px
    style O fill:#f9f,stroke:#333,stroke-width:4px
```