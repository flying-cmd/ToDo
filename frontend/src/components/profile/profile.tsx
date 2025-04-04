import React, { FC, ReactElement } from "react";
import { Avatar, Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

interface IProfile {
  name?: string;
}

export const Profile: FC<IProfile> = (props): ReactElement => {
  const { name = 'John' } = props;
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}  
    >
      <Avatar
        sx={{
          width: '96px',
          height: '96px',
          backgroundColor: 'primary.main',
          marginBottom: '16px'
        }}
      >
        J
      </Avatar>
      <Typography
        variant="h4"
        color={"text.primary"}
      >
        {`${name.substring(0, 1)}`}
      </Typography>
      <Typography
        variant="h6"
        color={"text.primary"}
      >
        {`Welcome, ${name}`}
      </Typography>
      <Typography
        variant="body1"
        color={"text.primary"}
      >
        This is your personal task manager
      </Typography>
    </Box>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
};