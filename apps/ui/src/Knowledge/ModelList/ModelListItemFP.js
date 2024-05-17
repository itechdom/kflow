import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
import ImageGallery from "react-image-gallery";
import {
    Chip,
    Card,
    CardActionArea,
    CardContent,
    CardActions,
    CardMedia,
    Typography,
    IconButton,
    Grid
} from "@mui/material";

const ModelListItemFP = ({
    classes,
    model,
    updateModel,
    deleteModel,
    setDeletedModel,
    deletedModel,
    match,
    history,
    onEdit,
    onView,
    getUnsplash,
    page,
    setPage,
}) => {
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [fetchedImage, setFetchedImage] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [actionOpen, setActionOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const fetchImages = () => {
        if (model) {
            const segments = model.title.split("-");
            const modelName =
                segments.length > 1 ? segments[segments.length - 1] : model.title;
            getUnsplash && getUnsplash(modelName.toLowerCase()).then((urls) => {
                setFetchedImage(urls);
            });
        }
    };

    React.useEffect(() => {
        fetchImages();
    }, [page]);

    const renderImageGallery = () => {
        return (
            <ImageGallery
                startIndex={selectedImage}
                showFullscreenButton={false}
                showBullets={false}
                showPlayButton={false}
                showThumbnails={false}
                onSlide={(currentIndex) => {
                    setSelectedImage(currentIndex);
                }}
                renderLeftNav={(onClick, disabled) => {
                    return disabled ? (
                        <></>
                    ) : (
                        <IconButton onClick={onClick}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                    );
                }}
                renderRightNav={(onClick, disabled) => {
                    return disabled ? (
                        <></>
                    ) : (
                        <IconButton onClick={onClick}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    );
                }}
                items={fetchedImage.map((url) => {
                    return {
                        original: url,
                        thumbnail: url,
                    };
                })}
            />
        );
    };

    return (
        <Grid style={{ marginBottom: "10em" }} container justify="center">
            <Grid item>
                <Card className={classes.card} style={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)' }}>
                    <CardActionArea
                        onClick={() => {
                            onView
                                ? onView(model)
                                : history.push(`${match.path}/view/${model._id}`);
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5">
                                {model.name || model.title}
                            </Typography>
                        </CardContent>
                        <Grid container justify="center">
                            {fetchedImage && fetchedImage.length > 0 ? (
                                <CardMedia
                                    className={classes.cardImage}
                                    component="img"
                                    alt="Contemplative Reptile"
                                    style={{ borderRadius: "50%", margin: "10px", width: "150px", height: "150px" }}
                                    image={fetchedImage[0].small}
                                    title="Contemplative Reptile"
                                />
                            ) : (
                                <img
                                    width="150px"
                                    height="150px"
                                    style={{ borderRadius: "50%", margin: "10px" }}
                                    src="https://picsum.photos/150/150"
                                />
                            )}
                        </Grid>
                        <CardContent>
                            <Typography variant="body2" style={{ fontFamily: 'sans-serif', color: '#8D8D8D' }}>
                                {model.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {model?.tags?.map((tag, index) => (
                            <Chip
                                key={index}
                                size="small"
                                style={{ fontSize: "10px", marginRight: "3px", backgroundColor: '#F0F0F0', color: '#5B5B5B' }}
                                variant="outlined"
                                label={<>{tag}</>}
                            />
                        ))}
                    </CardActions>
                    <ConfirmDeleteModal
                        open={open}
                        setOpen={setOpen}
                        onConfirm={() => {
                            deleteModel(deletedModel).then(() => {
                                setOpen(false);
                            });
                        }}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};
export default ModelListItemFP;