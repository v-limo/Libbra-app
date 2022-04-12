import React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Container } from '@mui/material'

export const Footer = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ marginRight: 4 }}>
        <p>©2019- {new Date().getFullYear()} Vincent Limo </p>
      </Box>
      <Box sx={{ marginLeft: 4 }}>
        <a
          href='https://github.com/v-limo'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon />
        </a>
      </Box>
    </Container>
  )
}
