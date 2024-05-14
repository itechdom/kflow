    <>
      <header>
        <Button onClick={() => history.push('/')} color="primary">
          Back to Home
        </Button>
        <h1>{model.title}</h1>
        <Paper style={{ padding: "1em", borderRadius: "50px" }}>
          <Grid style={{ marginBottom: "1em" }} container justify="flex-end">
            <Grid item xs={12}>
              <Autocomplete
                inputClassName={classes.autocomplete}
                throttleSearch={true}
                placeholder={`Search ${model.title}`}
                onSelect={(suggestion) => {
                  TreeOperations.handleNodeToggle(suggestion.id);
                  setTimeout(() => {
                    document.getElementById(suggestion.id).style =
                      "border:black 0.2px solid";
                    document.getElementById(suggestion.id).scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "start",
                    });
                  }, 1000);
                }}
                loadSuggestions={(text) => {
                  return new Promise((resolve, reject) => {
                    let found = handleNodeSearch(mindmapByKeys, text);
                    found && resolve(found);
                  });
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </header>
      {model && (
        <Toolbar>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              aria-label="Edit Note"
              label="Edit Note"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => onEdit(model)}
            >
              <EditIcon style={{ marginRight: "5px" }} />
            </Button>
            <Button
              variant="contained"
              aria-label="Edit Note"
              label="Edit Note"
              color="secondary"
              onClick={() => setDeleting(true)}
            >
              <DeleteIcon style={{ marginRight: "5px" }} />
            </Button>
          </Grid>
        </Toolbar>
      )}
      <ConfirmDeleteModal
        open={deleting}
        setOpen={setDeleting}
        onConfirm={() => {
          setDeleting(false);
          knowledge_deleteModel(model).then((res) => {
            onDelete && onDelete();
          });
        }}
      />
      <ModelPreviewViewOption
        viewOption={viewOption}
        setViewOption={setViewOption}
        classes={classes}
      />
      {mindmapByKeys && (
        <Grid container justify="space-between">
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Grid container justify="center" style={{ marginBottom: "30px" }}>
              <Grid item md={4}></Grid>
            </Grid>
            <Paper>
              <div
                ref={(ref) => {
                  if (!graphContainer) {
                    measure.graphRefCallback(ref);
                  }
                }}
              >
                <Mindmap
                  mindmapByKeys={mindmapByKeys}
                  editedNode={editedNode}
                  knowledgeChat={knowledgeChat}
                  edit={edit}
                  level={level}
                  width={graphContainer && graphContainer.width}
                  height={graphContainer && graphContainer.height}
                  {...TreeOperations}
                ></Mindmap>
              </div>
            </Paper>
          </Grid>
          <Grid
            style={{
              marginTop: "30px",
              marginBottom: "6em",
            }}
            {...listTreeSizes}
            item
          >
            <Paper
              style={{
                height: "400px",
                overflow: "scroll",
              }}
              id="scrollContainer"
            >
              <div
                ref={(ref) => {
                  if (!listContainer) {
                    measure.listRefCallback(ref);
                  }
                }}
              >
                <ListTree
                  mindmapByKeys={mindmapByKeys}
                  title={model.title}
                  editedNode={editedNode}
                  edit={edit}
                  level={level}
                  onRefs={(references) => {
                    setReferences(references);
                  }}
                  {...TreeOperations}
                />
              </div>
            </Paper>
          </Grid>

          <Grid {...graphTreeSizes} item style={{ marginTop: "30px" }}>
            <Grid item>
              <Paper>
                <List>
                  {wiki &&
                    wiki.map((link) => (
                      <ListItem>
                        <a target="_blank" href={link}>
                          {link}
                        </a>
                      </ListItem>
                    ))}
                  {wiki &&
                    wiki.map((link) => (
                      <ListItem>
                        <a target="_blank" href={link}>
                          {link}
                        </a>
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Grid {...graphTreeSizes} item style={{ marginTop: "30px" }}>
            <Grid container justify="center" style={{ marginBottom: "10px" }}>
              <Grid item md={4}></Grid>
            </Grid>
            <Paper>
              <div
                ref={(ref) => {
                  if (!graphContainer) {
                    measure.graphRefCallback(ref);
                  }
                }}
              >
                <GraphTree
                  mindmapByKeys={mindmapByKeys}
                  editedNode={editedNode}
                  edit={edit}
                  level={level}
                  width={graphContainer && graphContainer.width}
                  height={graphContainer && graphContainer.height}
                  {...TreeOperations}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
      {!mindmapByKeys && (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )}
    </>