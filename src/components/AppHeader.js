import React from "react";

import {
  Anchor,
  Box,
  DropButton, Image,
  Menu,
  ResponsiveContext,
  Text
} from "grommet";
import { Down } from "grommet-icons";
import { UserMenu } from ".";

import logoImg from '../assets/kme.png'

export const AppHeader = ({ appName, appIcon, userSession, open }) => (
  <Box
    flex={false}
    tag="header"
    direction="row"
    background="dark-1"
    align="center"
    justify="between"
    responsive={false}
  >


    <Box
        margin="small"
        round="xsmall"
        background={{ opacity: "weak" }}
        direction="row"
        align="center"
        pad={{ horizontal: "small" }}
    >
      <Image
          src={logoImg}
      />
    </Box>

    <DropButton
      open={open}
      onClose={() => {}}
      dropContent={
        <Box pad="small">
          <Text size="medium" margin="small">
            Settings
          </Text>
          <Text size="medium" margin="small">
            Documention
          </Text>
          <Box direction="row" justify="between">
            <Text size="medium" margin="small">
              Logout
            </Text>
            {userSession && (
              <UserMenu
                alignSelf="center"
                user={userSession.user}
                items={userSession.items}
              />
            )}
          </Box>
        </Box>
      }
    >
      <Box
        pad={{ horizontal: "medium", vertical: "small" }}
        responsive={false}
        direction="row"
        align="center"
        gap="small"
      >
        <Text>{appName}</Text>
        <Down color="brand" size="small" />
      </Box>
    </DropButton>

  </Box>
);
