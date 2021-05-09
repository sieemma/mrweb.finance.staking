import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./style.scss";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import generalQuestions from "../../utils/GeneralQuestions.json";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    padding: "50px 8vw",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function FAQ() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    document.title = "MrWebFinance - FAQ"
  }, [])

  return (
    <div className={classes.root}>
      <div className="faqContainer">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="General Questions" {...a11yProps(0)} />
          <Tab label="Disclaimer" {...a11yProps(1)} />
          <Tab label="Socials" {...a11yProps(2)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <h4>General Questions</h4>
        {generalQuestions.map((data, item) => {
          return (
            <div className="questionContainer">
              <div>
                <HelpOutlineIcon />
              </div>
              <div className="content">
                <div className="question">{data.questoinTitle}</div>
                <div className="answer">{data.questionAnswer}</div>
              </div>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
          <h3>Disclaimer</h3>
        <div className="disclaimer">
          <div>
            <HelpOutlineIcon />
          </div>
          <div className="content">
            We are pleased to announce that we successfully underwent our token
            lock event yesterday, 4th April, 2021. For those who have read
            through our whitepaper, you would find out that we have laid down
            some measures to prevent tokens being in the hands of the team. One
            of the is to make sure the team does not hold more than 40% of the
            circulating supply if the amount planned for liquidity purposes is
            deducted. As a result, we have locked up to 80 000 000 AMA tokens in
            our lock contract.
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>Socials</h3>

        <div className="facebook" style={{marginBottom: "20px"}}>
            <div className="title">
                <span>Facebook</span>
            </div>
            <Link to={{pathname: "https://www.facebook.com/Mrwebfinance/"}} target="_blank">MrwebFinance</Link>
        </div>
        <div className="twitter" style={{marginBottom: "20px"}}>
            <div className="title">
                <span>Twitter</span>
            </div>
            <Link to={{pathname: "https://twitter.com/MrwebFinance"}} target="_blank">MrwebFinance</Link>
        </div>
        <div className="telegram" style={{marginBottom: "20px"}}>
            <div className="title">
                <span>Telegram</span>
            </div>
            <Link to={{pathname: "https://t.me/mrwebfinance"}} target="_blank">MrwebFinance</Link>
        </div>
        <div className="youtube">
            <div className="title">
                <span>YouTube</span>
            </div>
            <Link to={{pathname: "https://www.youtube.com/channel/UCvYLTpHvy4X-FE9Gp7H0gbw"}} target="_blank">MrwebFinance</Link>
        </div>
      </TabPanel>
    </div>
  );
}
