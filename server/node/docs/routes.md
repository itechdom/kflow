router                                                                                                         
 ├── query                                         *                                                           
 ├── expressInit                                   *                                                           
 ├── session                                       *                                                           
 ├── bound dispatch                                *                                                           OPTIONS
 │    └── corsMiddleware                           /                                                           OPTIONS
 │   
 ├── corsMiddleware                                *                                                           
 ├── <anonymous>                                   *                                                           
 ├── urlencodedParser                              *                                                           
 ├── jsonParser                                    *                                                           
 ├── logger                                        *                                                           
 ├── router                                        /^\/knowledge\/?(?=\/|$)/                                   
 │   router                                                                                                    
 │    ├── bound dispatch                           /                                                           GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /paginate/:page/:limit                                      GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /create                                                     POST
 │    │    └── <anonymous>                         /                                                           POST
 │    │   
 │    ├── bound dispatch                           /                                                           PUT
 │    │    └── <anonymous>                         /                                                           PUT
 │    │   
 │    ├── bound dispatch                           /:_id                                                       DELETE
 │    │    └── <anonymous>                         /                                                           DELETE
 │    │   
 │    └── bound dispatch                           /search                                                     POST
 │         └── <anonymous>                         /                                                           POST
 │        
 │   
 ├── router                                        /^\/knowledge\/?(?=\/|$)/                                   
 │   router                                                                                                    
 │    ├── serveStatic                              /^\/file\/?(?=\/|$)/                                        
 │    ├── bound dispatch                           /media                                                      POST
 │    │    ├── multerMiddleware                    /                                                           POST
 │    │    └── <anonymous>                         /                                                           POST
 │    │   
 │    ├── bound dispatch                           /gallery                                                    POST
 │    │    ├── multerMiddleware                    /                                                           POST
 │    │    └── <anonymous>                         /                                                           POST
 │    │   
 │    ├── bound dispatch                           /media                                                      PUT
 │    │    ├── multerMiddleware                    /                                                           PUT
 │    │    └── <anonymous>                         /                                                           PUT
 │    │   
 │    ├── bound dispatch                           /gallery                                                    PUT
 │    │    ├── multerMiddleware                    /                                                           PUT
 │    │    └── <anonymous>                         /                                                           PUT
 │    │   
 │    └── bound dispatch                           /remove/media                                               DELETE
 │         └── <anonymous>                         /                                                           DELETE
 │        
 │   
 ├── router                                        /^\/knowledge\/?(?=\/|$)/                                   
 │   router                                                                                                    
 │    ├── bound dispatch                           /count                                                      GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /count/:field                                               GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /count/time/:period                                         GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /count/:field/time/:period                                  GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /max/:field                                                 GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /max/:field/time/:period                                    GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /min/:field                                                 GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /min/:field/time/:period                                    GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /sum/:field                                                 GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /sum/:field/time/:period                                    GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /average/:field                                             GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /average/:field/time/:period                                GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    ├── bound dispatch                           /distinct/:field                                            GET
 │    │    └── <anonymous>                         /                                                           GET
 │    │   
 │    └── bound dispatch                           /aggregate/:op/:fn/:fields                                  GET
 │         └── <anonymous>                         /                                                           GET
 │        
 │   
 ├── router                                        /^\/knowledge\/?(?=\/|$)/                                   
 │   router                                                                                                    
 │    └── bound dispatch                           /forms                                                      GET
 │         └── <anonymous>                         /                                                           GET
 │        
 │   
 ├── router                                        /^\/knowledge\/?(?=\/|$)/                                   
 │   router                                                                                                    
 │    ├── bound dispatch                           /chat                                                       POST
 │    │    └── <anonymous>                         /                                                           POST
 │    │   
 │    └── bound dispatch                           /image                                                      POST
 │         └── <anonymous>                         /                                                           POST
 │        
 │   
 └── <anonymous>                                   /^\/schemas\/?(?=\/|$)/                                     
