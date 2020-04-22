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
//import ExampleChart from "./components/Example/Chart/ExampleChart";

//import ExampleDatatable from "./components/Example/Datatable/ExampleDatatable";
import ExampleDatatable2 from "./components/Example/Datatable/ExampleDatatable2";
import {LineChart} from "grommet-icons";

import registerServiceWorker from './registerServiceWorker';

const userSession = {
  user: {
    name: "Matteo Domenici",
    thumbnail: "//s.gravatar.com/avatar/f1226004485be4f88e25f5fc083fd83f?s=80"
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
            appName="Kme PBL"
            appIcon={<Menu />}
            userSession={userSession}
          />
          <Box flex overflow="auto" gap="medium" pad="medium">
            {/*<Box
              flex={false}
              overflow="auto"
              round="large"
              background={{ color: "dark-5", opacity: "weak" }}
              direction="row"
              align="center"
              pad={{ horizontal: "medium", vertical: "small" }}
              margin={{ horizontal: "medium", top: "medium" }}
            >
              <Search color="brand" />
              <TextInput plain placeholder="Search Cluster" type="search" />
            </Box>*/}
            <Box flex={false} align="center">
              <Box flex={false} direction="row-responsive" overflow="auto" >
                <Box gap="medium" flex="grow" margin="medium" width="xlarge" height="small">
                  <LastPBLValue/>
                </Box>
              </Box>
              <Box flex={false} direction="row-responsive" overflow="auto">
                <Box gap="small" flex="grow" margin="small" round pad="medium" background="white" width="xlarge" height="medium">
                  <Mychart/>
                </Box>
              </Box>

              <Box flex={false} direction="row-responsive" overflow="auto">
                <Box gap="small" flex="grow" margin="small" round pad="medium" background="white" width="xlarge">
                  <Accordion flex align='center' justify='center'>
                    <AccordionPanel label="PREZZI STORICI BASE LATTONERIA (TON)" width="large">
                      <Box>
                        <ExampleDatatable2/>
                      </Box>
                    </AccordionPanel>
                  </Accordion>
                </Box>
              </Box>
                {/*<Box align='start' flex="grow" margin="medium" round pad="medium" background="white" >
                  <Value
                      value={(
                          <Box direction='row' align='center' gap='xsmall'>
                            <Text size='large' weight='bold' color='status-error'>30%</Text>
                            <Down color='status-error' />
                          </Box>
                      )}
                      label='custom value'
                  />
                </Box>*/}
                {/*<Box gap="large" flex="grow" margin="medium">
                  {utilization.map(data => (
                    <UtilizationCard key={data.name} data={data} />
                  ))}
                </Box>
                <Box flex="grow" margin="medium">
                  <Hardware data={hardware} />
                </Box>*/}
            </Box>

          </Box>

          {/*<Box
            flex={false}
            pad={{ vertical: "xsmall", left: "medium" }}
            responsive={false}
            background={{ color: "brand", dark: false }}
            direction="row"
            align="center"
            justify="between"
          >
            <Text color="light-2">Footer</Text>
            <Button
              size="medium"
              label="Show Tasks"
              icon={<Menu color="white" />}
              reverse={true}
            />
          </Box>*/}
          <Footer background="dark-1" pad="small">
            <Box align="center" direction="row" gap="xsmall">
              <LineChart color="white" size="medium" />
              <Text alignSelf="center" color="white" size="small">
                Pbl price data
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
