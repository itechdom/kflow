make me a conceptual architecture diagram of my new "Programming Framework For the AI age".

I will give you the general idea and then present you with a bunch of flow charts describing exactly how this framework is built.

the idea is that this framework is a functional composition of different modules that build on top of each other. The Orbital name here suggests that the "unit" or building block of this system is called "Orbital unit" and this orbital unit can be invoked with "Model name" parameter to produce a full nodejs backend and react frontend code. It's very powerfull due to this dual nature that it imposes.

notice how domainLogic is used here. This is where we define any custom logic inside of let's say forms, media or crud.

can you make me a more general diagram than that. Think of an integration document.

this is how the "CRUD service is"

One example of such service is the CRUD service (responsible for creating create read update routes) as well as Forms (responsible for storing and serving form data over http and other interfaces). Media, where we can store files and retrieve them.

your task is create a full conceptual chart of the Orbital Unit.

here is more flow charts of the other services:
here is the forms service chart:

here is both media and forms service:

Here is a flowchart of how this orbital unit is composed from the outside (Model Name= knowledge):

```mermaid
flowchart TD
    A[Start] --> B[Import Packages]
    B --> C[Define Knowledge Function]
    C --> D[Set Model Name]
    D --> E[Define crudDomainLogic]
    E --> F[Create knowledgeApi with crudService]
    F --> G[Define vizDomainLogic]
    G --> H[Create vizApi with vizService]
    H --> I[Create gptApi with gptService]
    I --> J[Define mediaDomainLogic]
    J --> K[Create fileUploadApi with mediaService]
    K --> L[Define formsDomainLogic]
    L --> M[Create formsApi with formsService]
    M --> N{autoPopulateDB?}
    N -->|Yes| O[Register Actions and Forms]
    N -->|No| P[Skip Registration]
    O --> Q[Return APIs]
    P --> Q
    Q --> R[End]

    style A fill:#f9f,stroke:#333,stroke-width:4px
    style R fill:#f9f,stroke:#333,stroke-width:4px
```



```mermaid
flowchart TD
    A[Start] --> B[Import Packages]
    B --> C[Define formsService Function]
    C --> D[Initialize API Routes]
    D --> E[Define GET /forms Route]
    E --> F[Execute Domain Logic for Read]
    F --> G{isPermitted?}
    G -->|No| H[Send 409 Unauthorized]
    G -->|Yes| I[Query Database]
    I --> J{Error?}
    J -->|Yes| K[Send 500 Error]
    J -->|No| L{onResponse Defined?}
    L -->|Yes| M[Call onResponse with Data]
    L -->|No| N[Send 200 with Data]
    N --> O[Return API Routes]
    
    O --> P[Define registerForms Function]
    P --> Q[Set lookUpKey]
    Q --> R[Call setForms Function]
    
    R --> S[Define setForms Function]
    S --> T{autoPopulateDB?}
    T -->|No| U[End]
    T -->|Yes| V[Update formsModel]
    V --> W{Error?}
    W -->|Yes| X[Log Error]
    W -->|No| Y[Log Forms Set]
    Y --> U

    style A fill:#f9f,stroke:#333,stroke-width:4px
    style U fill:#f9f,stroke:#333,stroke-width:4px
```

media:
```mermaid
flowchart TD
    A[Start] --> B[Import Packages]
    B --> C[Define Constants]
    C --> D[Define mediaService Function]
    D --> E[Initialize API Routes]
    E --> F[Check/Create Media Folder]
    F --> G[Configure Multer Storage]
    G --> H[Configure Multer Upload]

    H --> I[Serve Static Files]
    I --> J[Define Media Routes]
    
    J --> K[Define POST /media Route]
    K --> L[Execute Domain Logic for Save Media]
    L --> M{isPermitted?}
    M -->|No| N[Send 409 Unauthorized]
    M -->|Yes| O[Send 200 with Media File URL]

    J --> P[Define POST /gallery Route]
    P --> Q[Execute Domain Logic for Save Media]
    Q --> R{isPermitted?}
    R -->|No| S[Send 409 Unauthorized]
    R -->|Yes| T[Send 200 with Gallery URLs]

    J --> U[Define PUT /media Route]
    U --> V[Execute Domain Logic for Save Media]
    V --> W{isPermitted?}
    W -->|No| X[Send 409 Unauthorized]
    W -->|Yes| Y[Update Model with New Media]
    Y --> Z{Error?}
    Z -->|Yes| AA[Send 500 Error]
    Z -->|No| AB[Send 200 with Updated Media URL]

    J --> AC[Define PUT /gallery Route]
    AC --> AD[Execute Domain Logic for Save Media]
    AD --> AE{isPermitted?}
    AE -->|No| AF[Send 409 Unauthorized]
    AE -->|Yes| AG[Update Model with New Gallery]
    AG --> AH{Error?}
    AH -->|Yes| AI[Send 500 Error]
    AH -->|No| AJ[Send 200 with Updated Gallery URLs]

    J --> AK[Define DELETE /remove/media Route]
    AK --> AL[Execute Domain Logic for Save Media]
    AL --> AM{isPermitted?}
    AM -->|No| AN[Send 409 Unauthorized]
    AM -->|Yes| AO[Delete Media File]
    AO --> AP{Error?}
    AP -->|Yes| AQ[Send 500 Error]
    AP -->|No| AR[Send 200 Deleted]

    AR --> AS[Return API Routes]
    AS --> AT[End]

    style A fill:#f9f,stroke:#333,stroke-width:4px
    style AT fill:#f9f,stroke:#333,stroke-width:4px
```