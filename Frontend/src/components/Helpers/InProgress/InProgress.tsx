
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styles from "./InProgress.module.scss";


const InProgress: React.FC = () => {
    return (
        <Box className={styles.container}>
            <CircularProgress />
        </Box >
    );
};
export default InProgress;