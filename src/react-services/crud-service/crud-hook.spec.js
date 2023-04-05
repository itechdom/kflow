it("should render CrudContainerFP", () => {
    const { container } = render(<CrudContainerFP
        modelName="knowledge"
        offlineStorage={offlineStorage}
        SERVER={config.SERVER}
        query=""
        render={(props) => {
            return <>
                <Another {...props} />
                <Another {...props} />
                <Another {...props} />
                <Another {...props} />
            </>
        }}
    />);
    expect(container).toBeTruthy();
});
it("should render CrudContainerFP with injected props", () => {
    const { container } = render(<CrudContainerFP
        modelName="knowledge"
        offlineStorage={offlineStorage}
        SERVER={config.SERVER}
        query=""
        render={(props) => {
            return <>
                <Another {...props} />
                <Another {...props} />
                <Another {...props} />
                <Another {...props} />
            </>
        }}
    />);
    expect(container).toBeTruthy();
});