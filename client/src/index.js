import React, {Component} from "react";
import ReactDOM  from "react-dom";
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Footer,
  Grommet,
  ResponsiveContext,
  Text,
  TextInput
} from "grommet";
import {FacebookOption, Instagram, Menu, Search, Twitter} from "grommet-icons";
import {theme} from "./theme";
import {AppHeader} from "./components";
import LastPBLValue from './components/LastPBLValue'
//import {LastPBLValue} from "./components";
//import {actualValue} from "./data";
import Mychart from "./components/Example/Chart/Mychart";
import userAvatar from './Assets/user_logo.png';
//import ExampleChart from "./components/Example/Chart/ExampleChart";

//import ExampleDatatable from "./components/Example/Datatable/ExampleDatatable";
import ExampleDatatable2 from "./components/Example/Datatable/ExampleDatatable2";
import {LineChart} from "grommet-icons";

import registerServiceWorker from './registerServiceWorker';

const userSession = {
  user: {
    name: "Matteo Domenici",
    thumbnail: userAvatar
  },
  items: [
    {
      label: "Logout",
      href: "#"
    }
  ]
};

const Media = () => (
    <Box direction="row" gap="xxsmall" justify="center">
      <Anchor
          a11yTitle="Share feedback on Github"
          href="https://www.instagram.com/"
          icon={<Instagram color="white" />}
      />
      <Anchor
          a11yTitle="Chat with us on Slack"
          href="https://www.facebook.com/"
          icon={<FacebookOption color="white" />}
      />
      <Anchor
          a11yTitle="Follow us on Twitter"
          href="https://twitter.com/"
          icon={<Twitter color="white" />}
      />
    </Box>
);

class AppBody extends Component {

  static contextType = ResponsiveContext;
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill background="light-3">
          <AppHeader
            appName="Kme CMI"
            appIcon={<Menu />}
            userSession={userSession}
          />
          <Box flex overflow="auto" gap="medium" pad="medium">
            <Box flex align="center">
              <Box flex={false} direction="row-responsive">
                <Box gap="small" flex="grow" margin="small" width="xlarge" height="small">
                  <LastPBLValue/>
                </Box>
              </Box>
              <Box flex={false} direction="row-responsive">
                <Box gap="small" flex="grow" margin="small" round pad="medium" background="white"
                     width="xlarge" height="medium">
                  <Mychart/>
                </Box>
              </Box>
              <Box flex={false} direction="row-responsive">
                <Box gap="small" flex="grow" margin="small" round pad="medium" background="white"
                     width="xlarge">
                  <ExampleDatatable2/>
                </Box>
              </Box>
            </Box>
          </Box>
          <Footer background="dark-1" pad="small">
            <Box align="center" direction="row" gap="xsmall">
              <LineChart color="white" size="medium" />
              <Text alignSelf="center" color="white" size="small">
                CMI price data
              </Text>
            </Box>
            <Media />
            <Text textAlign="center" color="white" size="small">
              ©Copyright 2020 Kme Srl
            </Text>
          </Footer>
        </Box>
      </Grommet>
    );
  }
}
const App = () => (
  <Grommet theme={theme} full>
    <AppBody />
  </Grommet>
);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
